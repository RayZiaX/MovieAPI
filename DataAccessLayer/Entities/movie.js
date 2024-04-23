const { DataTypes, Model } = require('sequelize');
require("dotenv").config()

class Movie extends Model{}

function initUserModel(context){
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
        modelName: "Movie",
        tableName: "movies",
        createdAt: false,
        updatedAt: false
    })

    return Movie;
}

module.exports = initUserModel
