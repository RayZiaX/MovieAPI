const MoviesRepository = require('./MoviesRepository')

class Repositories{
    constructor(context){
        this.context = context
        this.movieRepo = undefined
    }

    getMovieRepository(){
        if(this.movieRepo == undefined){
            this.movieRepo = new MoviesRepository(this.context)
        }
        return this.movieRepo;
    }
}

module.exports = Repositories