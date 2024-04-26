const { DataTypes, Model } = require('sequelize');

class Categorie extends Model{}


function initCategoriModel(context){
    Categorie.init({
        id_categorie:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },{
        sequelize: context,
        modelName: "categorie",
        tableName: "categories",
        createdAt: false,
        updatedAt: false
    })

    return Categorie;
}

module.exports = initCategoriModel