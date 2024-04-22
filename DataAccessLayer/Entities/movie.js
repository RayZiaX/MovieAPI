const { DataTypes, Model } = require('sequelize');
const { MovieContext } = require('../Contexts/MovieContext')
require("dotenv").config()
context = new MovieContext(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,process.env.DB_HOST,"postgres")


const Movie = context.define("movies",{
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
    tableName: "movies",
    createdAt: false,
    updatedAt: false
})

module.exports = Movie