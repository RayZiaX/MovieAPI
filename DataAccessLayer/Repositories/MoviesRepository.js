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

            let untrackEntities = movie.toJSON()

            if (untrackEntities) {
                this.response.setState(true)
                this.response.setEntity(untrackEntities)
            } else {
                this.response.setState(false)
                this.response.setError(new ErrorRepository(`le ${this.entityType} n'as pas été trouvé`, 404))
            }
        } catch (error) {
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
                idMovie: id
            }
            const fields = {
                name: data.name,
                description: data.description,
                date: data.date,
            }

            let oldmovie = await this.getByIdAsync(id)
            oldmovie.entity.name = fields.name;
            oldmovie.entity.description = fields.description;
            oldmovie.entity.date = fields.date;
            
            await oldmovie.entity.save()

            await this.context.moviesCategories.destroy({where: {id_movie: id}})

            await Promise.all(data.categorieId.map(cat => {
                return this.context.moviesCategories.create({movieId: id,categorieId: cat})
            }))
            let movie = await this.getMovieAndCategorieById(id)

            this.response.setState(true)
            this.response.setEntity(movie)
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur c'est produite durant la modification du ${this.entityType}`,500,error))
        }

        return this.response.toPrototype()
    }

    async getMoviesByCriteria(name,description,limit,offset){
        try {
            let criteria = {}
            if(name != undefined){
                criteria.name = {[Op.iLike]: `%${name}%`}
            }

            if(description != undefined){
                criteria.description = {[Op.iLike]: `%${description}%`}
            }
            let movies = {rows: [], count: 0}
            let rows = await this.entity.findAll({
                include: [
                    {
                        model: this.context.categories,
                        as: "categories",
                        through: {
                            attributes: []
                        }
                    }],
                where: criteria,
                offset: offset,
                limit: limit
            })

            rows.forEach(row => {
                movies.rows.push(row.toJSON())
            });

            movies.count = await this.entity.count({
                where: criteria,
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
