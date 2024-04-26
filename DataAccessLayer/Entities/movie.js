const { DataTypes, Model } = require('sequelize');

class Movie extends Model{}

function initMovieModel(context){
    Movie.init({
        id_movie:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date:{
            type: DataTypes.DATE,
            allowNull: false
        }
    },{
        sequelize: context,
        modelName: "movie",
        tableName: "movies",
        createdAt: false,
        updatedAt: false
    })

    return Movie;
}

module.exports = initMovieModel
