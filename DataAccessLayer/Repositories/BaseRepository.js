const ErrorRepository = require('./Utils/ErrorRepository')
const ResponseRepositories = require('./Utils/ResponseRepositories')

/**
 * Repository réposotory de base qui permet de réaliser des actions générique pour une entité
 */
class BaseRepository{
    constructor(context,entity, type){
        this.context = context
        this.entity = entity
        this.response = new ResponseRepositories()
        this.entityType = type
    }

    async getByIdAsync({id,tracking = false}){
        try {
            const entity = await this.entity.findByPk(id);
            if (entity) {
                this.response.setState(true)
                if(tracking){
                    this.response.setEntity(entity)
                }else{
                    this.response.setEntity(entity.toJSON())
                }
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

    async getAllAsync({tracking = false}){
        try {
            const movies = await this.entity.findAll();
            this.response.setState(true)
            if(tracking){
                this.response.setEntity(movies)
            }else{
                this.response.setEntity(movies.map(movie => { movie.toJSON()}))
            }
        } catch (error) {
            
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur est survenu durant la récupération de l'ensemble des ${this.entityType}`,500,error).toPrototype())
        }

        return this.response.toPrototype()
    }

    async createAsync({data, tracking = false}) {
        try {
            const movie = await this.entity.create(data);
            this.response.setState(true)
            if(tracking){
                this.response.setEntity(movie)
            }else{
                this.response.setEntity(movie.toJSON())
            }
            
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur c'est produite durant la création du ${this.entityType}`,500,error).toPrototype())
        }

        return this.response.toPrototype()
    }

    async deleteAsync({id}){
        try {
            this.result = await this.entity.destroy({where: {id_movie: id}})
            this.response.setState(this.result > 0)
            
            if(this.response.success){
                this.response.setEntity(`Le ${this.entityType} a été supprimé`)
            }else{
                this.response.setError(new ErrorRepository(`Le ${this.entityType} n'a pas été supprimé ou trouvé`,404).toPrototype())
            }
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`une erreur à été rencontré durant la suppression d ${this.entityType}`,500,error).toPrototype())
        }

        return this.response.toPrototype()
    }

    async updateAsync({fields, criteria, tracking=false}){
        try {
            this.result = await this.entity.update({fields}, {where: criteria})
            
            this.response.setState(this.result[0] > 0)

            if(this.response.success){
                this.movie = await this.entity.findByPk(id);
                if(tracking){
                    this.response.setEntity(this.movie)
                }else{
                    this.response.setEntity(this.movie.toJSON())
                }
            }else{
                this.response.setError(new ErrorRepository(`Aucun ${this.entityType} n'a été modifié`,404).toPrototype())
            }
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`une erreur a été réncontré durant la mise à jour`,500,error).toPrototype())
        }

        return this.response.toPrototype()
    }

    async existsByIdAsync(id){
        let result = await this.entity.findByPk(id)
        return result != undefined
    }
}

module.exports = BaseRepository