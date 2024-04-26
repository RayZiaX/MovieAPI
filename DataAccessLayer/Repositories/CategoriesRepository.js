const { where } = require("sequelize");
const BaseRepository = require("./BaseRepository");
const ErrorRepository = require('./Utils/ErrorRepository');


class CategoriesRepository extends BaseRepository{
    constructor(context,entity){
        super(context,entity, "categorie")
    }

    async getCategoryAndMoviesByIdAsync(id, offset, limit){
        try {
            const data = {}
            let result = await this.getByIdAsync(id)

            if(result.success){
                data.categorie = result.entity
            }else{
                this.response.setState(false)
                this.response.setError(result.error)
                return this.response.toPrototype()
            }

            let {rows, count} = await this.context.movies.findAndCountAll({
                include: [{
                    model: this.context.categories,
                    as: 'categories',
                    attributes: [],
                    where: { id_categorie: id },
                    through: { attributes: [] }
                  }],
                  offset: offset,
                  limit: limit
            })
            data.total = count
            data.categorie.movies = rows
            this.response.setState(true)
            this.response.setEntity(data)

        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur a été rencontré durant la récupération d'un ${this.entityType}`, 500, error))
        }
        return this.response.toPrototype()
    }
}


module.exports = CategoriesRepository