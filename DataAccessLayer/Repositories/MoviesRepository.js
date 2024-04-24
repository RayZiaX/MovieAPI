const { where, Op } = require('sequelize');
const initUserModel = require('../Entities/movie');
const BaseRepository = require('./BaseRepository');
const ErrorRepository = require('./Utils/ErrorRepository');

class MoviesRepository extends BaseRepository{
    constructor(context){
        super(initUserModel(context),"Movie");
    }

    async getMoviesByName(name,limit,offset){
        try {
            const movies = await this.entity.findAndCountAll({
                where: {
                    name: {
                        [Op.iLike]: `%${name}%`
                    }
                },
                offset: offset,
                limit: limit
            })
            this.response.setState(true)
            this.response.setEntity(movies)
        }catch(error){
            this.response.setState(true)
            this.response.setError(new ErrorRepository("une erreur a été recontré durant le processus", 500, error))
        }

        return this.response.toPrototype()
    }
}


module.exports = MoviesRepository
