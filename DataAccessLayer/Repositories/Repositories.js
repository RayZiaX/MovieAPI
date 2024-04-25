const MoviesRepository = require('./MoviesRepository')
const CategoriesRepository = require('./CategoriesRepository')
class Repositories{
    constructor(context){
        this.context = context
        this.movieRepo = undefined
        this.categorieRepo = undefined
    }

    getMovieRepository(){
        if(this.movieRepo == undefined){
            this.movieRepo = new MoviesRepository(this.context)
        }
        return this.movieRepo;
    }

    getCategoriRepository(){
        if(this.categorieRepo == undefined){
            this.categorieRepo = new CategoriesRepository(this.context)
        }

        return this.categorieRepo;
    }

}

module.exports = Repositories