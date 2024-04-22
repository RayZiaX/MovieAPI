const { MoviesRepository } = require("../../DataAccessLayer/Repositories/MoviesRepository")

class MoviesServices{
    constructor(){
        this.moviRepo = new MoviesRepository();
    }

    async createMovieAsync(data) {
        try {
            this.movie = await this.moviRepo.createMovieAsync(data);
            return {
                success : true,
                data: this.movie
            }
        } catch (error) {
            return {
                success: false,
                message: `une erreur a été rencontré ${error}`
            }
        }
    }

    async getAllMoviesAsync(){
        this.result = await this.moviRepo.getAll()
        if(this.result.success){
            return {
                success: true,
                data: this.result.movies
            }
        }else{
            return {
                success: false,
                error: this.result.error
            }
        }
    }

    async getMovieById(id){
        this.result = await this.moviRepo.getById(id)
        if(this.result.success){
            return {
                success: true,
                data: this.result
            }
        }else{
            return {
                success: false,
                error: this.result.message
            }
        }
    }

    async updateMovieById(id,data){
        this.result = await this.moviRepo.updateMovie(id,data)
        console.log(this.result)
        if(this.result.success){
            return {
                success: true,
                data: this.result.movie
            }
        }else{
            return {
                success: false,
                error: this.result.error
            }
        }
    }

    async deleteMovieById(id){
        this.result = await this.moviRepo.deteteMovie(id)
        console.log(this.result)
        if(this.result.success){
            return {
                success: true,
                data: this.result.message
            }
        }else{
            return {
                success: false,
                error: this.result.error
            }
        }
    }
}

module.exports = { MoviesServices }