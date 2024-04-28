const { Sequelize } = require('sequelize');
const initMovieModel = require('../Entities/Movie');
const initCategoriModel = require('../Entities/Categorie');
const initMovieCategorieModel = require('../Entities/MovieCategorie');

/**
 * Class de l'orm qui réaliser la communication avec la base de données
 */
class MovieContext extends Sequelize{
    constructor(dbname,username, password,dbContextOptions){
        super(dbname,username,password,dbContextOptions)
        this._onModelCreating()
    }

    async testConnexionAsync(){
        try {
            await this.authenticate();
            return {
                success: true,
                message: "Connexion établie",
                code: 200
            }
        } catch (error) {
            return {
                success: true,
                error: {
                    message: `une erreur à été rencontré durant la connexion à la base de données: ${error}`,
                    code: 500
                }
            }
        }
    }

    /**
     * Méthode qui permet d'instancier les entités
     */
    _onModelCreating(){
        this.categories = initCategoriModel(this)
        this.movies = initMovieModel(this)
        this.moviesCategories = initMovieCategorieModel(this)
        this._onModelConfigure()
    }

    /**
     * Méthode qui permet de configurer les entités
     */
    _onModelConfigure(){
        this.categories.belongsToMany(this.movies, {
            as: "movies",
            through: "movies_categories",
            foreignKey: "id_categorie",
            otherKey: "id_movie"
        })
        this.movies.belongsToMany(this.categories, {
            as: "categories",
            through: "movies_categories",
            foreignKey: "id_movie",
            otherKey: "id_categorie"
        })
    }
}

module.exports = MovieContext 