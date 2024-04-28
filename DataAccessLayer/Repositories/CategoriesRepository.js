const { where, Op } = require("sequelize");
const BaseRepository = require("./BaseRepository");
const ErrorRepository = require('./Utils/ErrorRepository');

/**
 * Repository qui permet de gérer les différentes actions coté base de données pour l'entité "categorie"
 */
class CategoriesRepository extends BaseRepository{
    constructor(context,entity){
        super(context,entity, "categorie")
    }

    async getCategoryAndMoviesByIdAsync({id, offset, limit, tracking=false}){
        try {
            const data = {}
            let result = await this.getByIdAsync({id:id, tracking: tracking})

            if(result.success){

                data.categorie = result.entity

                data.categorie.movies = []
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
                    through: { 
                        model: this.context.moviesCategories,
                        attributes: [] 
                    },
                    where: { id_categorie: id },
                  }],
                  offset: offset,
                  limit: limit
            })
            data.total = count
            
            data.categorie.movies = await Promise.all(rows.map(async row =>{
                let movieCats = await row.getCategories({
                    joinTableAttributes: []
                })
                let movie = {}
                if(tracking){
                    movie = row
                    movie.categories = movieCats
                }else{
                    movie = row.toJSON()
                    movie.categories = movieCats.map(cat => cat.toJSON())  
                }
                return movie
            }))

            this.response.setState(true)
            this.response.setEntity(data)

        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`Une erreur a été rencontré durant la récupération d'un ${this.entityType}`, 500, error).toPrototype())
        }
        return this.response.toPrototype()
    }

    /**
     * Méthode qui permet de vérifier si les différentes identifiant contenu dans le tableau sont présent en base
     * @param {les différents identifiant de categories} ids 
     * @returns 
     */
    async existsRange(ids){
        try {
            let count = await this.context.categories.count({
                where:{
                    idCategorie: {[Op.in]: ids}
                }
            })
            this.response.setState(count === ids.length)
            if(!this.response.success){
                this.response.setError(new ErrorRepository(`certaines catégories ne sont pas présente en base`,404).toPrototype())
            }

        } catch (error) {
            this.response.setState(false)
            this.response.setError(new ErrorRepository(`une erreur c'est produit durant le compte des ${this.entityType}s`,500,error).toPrototype())
        }

        return this.response.toPrototype()
    }
}


module.exports = CategoriesRepository