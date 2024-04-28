const { DataTypes, Model } = require('sequelize');

class MovieCategorie extends Model{}

function initMovieCategorieModel(context){
    MovieCategorie.init({
        movieId: {
            type: DataTypes.INTEGER,
            references: {
              model: "movie",
              key: 'id_movie',
            },
            field: "id_movie",
            primaryKey: true
          },
          categorieId: {
            type: DataTypes.INTEGER,
            references: {
              model: "categorie",
              key: 'id_categorie',
            },
            field: "id_categorie",
            primaryKey: true
          },
    },{
        sequelize: context,
        modelName: "movieCategorie",
        tableName: "movies_categories",
        createdAt: false,
        updatedAt: false
    })
    return MovieCategorie
}


module.exports = initMovieCategorieModel