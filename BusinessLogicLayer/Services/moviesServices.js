const MoviesRepository = require("../../DataAccessLayer/Repositories/MoviesRepository")
const MovieServicesResponse = require("./ResponsesServices/MovieServicesResponse")

class MoviesServices{
    constructor(){
        this.moviRepo = new MoviesRepository();
        this.response = new MovieServicesResponse();
    }

    async createMovieAsync(data) {
        this.result = await this.moviRepo.createMovieAsync(data);
        this.response.setStatus(this.result.success)
        if(this.result.success){
            this.response.setData(this.result.movie)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async getAllMoviesAsync(){
        this.result = await this.moviRepo.getAll()
        this.response.setStatus(this.result.success)
        if(this.result.success){
            this.response.setData(this.result.movies)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async getMovieById(id){
        this.result = await this.moviRepo.getById(id)
        this.response.setStatus(this.result.success)

        if(this.result.success){
            this.response.setData(this.result.movie)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async updateMovieById(id,data){
        this.result = await this.moviRepo.updateMovie(id,data)
        this.response.setStatus(this.result.success)

        if(this.result.success){
            this.response.setData(this.result.movie)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response
    }

    async deleteMovieById(id){
        this.result = await this.moviRepo.deteteMovie(id)
        this.response.setStatus(this.result.success)
        if(this.result.success){
            this.response.setData(this.result.message)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }
}

module.exports = MoviesServices 