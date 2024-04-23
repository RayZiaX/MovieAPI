const ErrorRepository = require('./ErrorRepository')
const ResponseRepositories = require('./ResponseRepositories')


class BaseRepository{
    constructor(entity, type){
        this.entity = entity
        this.response = new ResponseRepositories()
        this.entityType = type
    }

    async getByIdAsync(id){
        try {
            const movie = await this.entity.findByPk(id);
            if (movie) {
                this.response.setState(true)
                this.response.setEntity(movie)
            } else {
                this.response.setState(false)
                this.response.setError(new ErrorRepository(`le ${this.entity} n'as pas été trouvé`, 404))
            }
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur a été rencontré durant la récupération d'un ${this.entityType}`, 500, error))
        }

        return this.response.toPrototype()
    }

    async getAllAsync(){
        
        try {
            const movies = await this.entity.findAll();
            this.response.setState(true)
            this.response.setEntity(movies)
        } catch (error) {
            
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur est survenu durant la récupération de l'ensemble des ${this.entityType}`,500,error))
        }

        return this.response.toPrototype()
    }

    async createAsync(data) {

        try {
            const {name, description, date} = data
            const movie = await this.entity.create({name, description, date});
            this.response.setState(true)
            this.response.setEntity(movie)
            
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur c'est produite durant la création du ${this.entityType}`,500,error))
        }

        return this.response.toPrototype()
    }

    async deleteAsync(id){
        try {
            this.result = await this.entity.destroy({where: {id_movie: id}})
            this.response.setState(this.result > 0)
            
            if(this.response.success){
                this.response.setEntity(`Le ${this.entityType} a été supprimé`)
            }else{
                this.response.setError(new ErrorRepository(`Le ${this.entityType} n'a pas été supprimé ou trouvé`,404))
            }
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`une erreur à été rencontré durant la suppression d ${this.entityType}`,500,error))
        }

        return this.response.toPrototype()
    }

    async updateAsync(id,data){
        try {
            const {name, description, date} = data
            this.result = await this.entity.update({
                name: name,
                description: description,
                date: date
            }, {where: {id_movie: id}})
            
            this.response.setState(this.result[0] > 0)

            if(this.response.success){
                this.movie = await this.entity.findByPk(id);
                this.response.setEntity(this.movie)
            }else{
                this.response.setError(new ErrorRepository(`Aucun ${this.entityType} n'a été modifié`,404))
            }
        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`une erreur a été réncontré durant la mise à jour`,500,error))
        }

        return this.response.toPrototype()
    }
}

module.exports = BaseRepository