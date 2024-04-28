const { DataTypes, Model } = require('sequelize');

class Categorie extends Model{}


function initCategoriModel(context){
    Categorie.init({
        idCategorie:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            field: "id_categorie"
        },
        name: {
            type: DataTypes.STRING,
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