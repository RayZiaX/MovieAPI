const { where, Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');
const ErrorRepository = require('./Utils/ErrorRepository');

class MoviesRepository extends BaseRepository{
    constructor(context,entity){
        super(context,entity,"Movie");
    }

    async getMovieAndCategorieById(id){
        try {
            const movie = await this.entity.findByPk(id, {
                include: [
                    {
                        model: this.context.categories,
                        as: "categories",
                        through: {
                            attributes: []
                        }
                    }]
            });
            if (movie) {
                this.response.setState(true)
                this.response.setEntity(movie)
            } else {
                this.response.setState(false)
                this.response.setError(new ErrorRepository(`le ${this.entityType} n'as pas été trouvé`, 404))
            }
        } catch (error) {
            console.log(error)
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur a été rencontré durant la récupération d'un ${this.entityType}`, 500, error))
        }
        return this.response.toPrototype()
    }

    async createMovieWithCategorieAsync({name,description,date,categorieId}){
        try {
            let movie = await this.entity.create({name, description, date});

            await Promise.all(categorieId.map(id => {
                return this.context.moviesCategories.create({movieId: movie.id_movie,categorieId: id})
            }))

            movie = await this.getMovieAndCategorieById(movie.id_movie)

            this.response.setState(true)
            this.response.setEntity(movie)
            
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur c'est produite durant la création du ${this.entityType}`,500,error))
        }

        return this.response.toPrototype()
    }

    async updateMovieAsync(id, data){
        try {
            const criteria ={
                id_movie: id
            }
            await this.updateAsync(data, criteria)
            await this.context.moviesCategories.destroy({where: {id_movie: id}})

            await Promise.all(data.categorieId.map(cat => {
                return this.context.moviesCategories.create({movieId: id,categorieId: cat})
            }))
            let movie = await this.getMovieAndCategorieById(id)

            this.response.setState(true)
            this.response.setEntity(movie)
        } catch (error) {
            console.log(error)
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur c'est produite durant la modification du ${this.entityType}`,500,error))
        }

        return this.response.toPrototype()
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
