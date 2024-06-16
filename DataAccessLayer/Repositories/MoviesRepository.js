const { where, Op } = require('sequelize');
const BaseRepository = require('./BaseRepository');
const ErrorRepository = require('./Utils/ErrorRepository');

/**
 * Repository qui permet de gérer les différentes actions coté base de données pour l'entité "movie"
 */
class MoviesRepository extends BaseRepository{
    constructor(context,entity){
        super(context,entity,"Movie");
    }

    async getMovieAndCategorieById({id, tracking=false}){
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

            let entity = movie

            if (entity) {
                if(!tracking){
                    entity = entity.toJSON()
                }
                this.response.setState(true)
                this.response.setEntity(entity)
            } else {
                this.response.setState(false)
                this.response.setError(new ErrorRepository(`le ${this.entityType} n'as pas été trouvé`, 404).toPrototype())
            }
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur a été rencontré durant la récupération d'un ${this.entityType}`, 500, error).toPrototype())
        }
        return this.response.toPrototype()
    }

    async createMovieWithCategorieAsync({data:{name,description,date, hasReservationsAvailable,categoriesId}, tracking=false}){
        try {
            let movie = await this.createAsync({data:{name, description,hasReservationsAvailable, date}, tracking:tracking});
            if(movie.success){
                await Promise.all(categoriesId.map(id => {
                    return this.context.moviesCategories.create({movieId: movie.entity.idMovie,categorieId: id})
                }))
                movie = await this.getMovieAndCategorieById({id:movie.entity.idMovie, tracking:tracking})
    
                this.response.setState(true)
                this.response.setEntity(movie.entity)
            }else{
                console.log(movie.error)
                this.response.setError(movie.error)
            }

        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur c'est produite durant la création du films et l'association des ses catégories`,500,error).toPrototype())
        }

        return this.response.toPrototype()
    }

    async updateMovieAsync({id, data,tracking=false}){
        try {
            const fields = {
                name: data.name,
                description: data.description,
                date: data.date,
                hasReservationsAvailable: data.hasReservationsAvailable
            }

            let oldmovie = await this.getByIdAsync({id:id, tracking:true})
            oldmovie.entity.name = fields.name;
            oldmovie.entity.description = fields.description;
            oldmovie.entity.date = fields.date;
            oldmovie.entity.hasReservationsAvailable = fields.hasReservationsAvailable;
            
            await oldmovie.entity.save()
            await this.context.moviesCategories.destroy({where: {id_movie: id}})

            await Promise.all(data.categoriesId.map(cat => {
                return this.context.moviesCategories.create({movieId: id,categorieId: cat})
            }))

            let movie = await this.getMovieAndCategorieById({id:id, tracking:tracking})

            this.response.setState(true)
            this.response.setEntity(movie.entity)
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur c'est produite durant la modification du ${this.entityType}`,500,error).toPrototype())
        }

        return this.response.toPrototype()
    }

    async getMoviesByCriteria({name,description,limit,offset, tracking = false}){
        try {
            let criteria = {}
            if(name != undefined){
                criteria.name = {[Op.like]: `%${name}%`}
            }

            if(description != undefined){
                criteria.description = {[Op.like]: `%${description}%`}
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

            if(!tracking){
                movies.rows = rows.map(row => row.toJSON())
            }

            movies.count = await this.entity.count({
                where: criteria,
                offset: offset,
                limit: limit
            })

            this.response.setState(true)
            this.response.setEntity(movies)
        }catch(error){
            this.response.setState(false)
            this.response.setError(new ErrorRepository("une erreur a été recontré durant le processus", 500, error).toPrototype())
        }

        return this.response.toPrototype()
    }
}


module.exports = MoviesRepository
