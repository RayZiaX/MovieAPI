const BaseRepository = require("./BaseRepository");
const initCategorieModel = require('../Entities/Categorie')
class CategoriesRepository extends BaseRepository{
    constructor(context){
        super(initCategorieModel(context), "categorie")
    }
}


module.exports = CategoriesRepository