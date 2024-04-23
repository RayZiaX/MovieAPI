const { Movies } = require('../Models/index');

class MovieController{
    constructor(movieServices){
        this.service = movieServices;
        this.serviceResponse = undefined;
    }

    async createMovieAsync(req, res){
        this.data = req.body;
        this.serviceResponse = await this.service.createMovieAsync(this.data)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,201, new Date())
        }else{
            res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.code, new Date())
        }
    }

    async getAllMoviesAsync(req,res){
        this.serviceResponse = await this.service.getAllMoviesAsync()
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.code, new Date())
        }
    }

    async getMovieByIdAsync(req, res){
        this.serviceResponse = await this.service.getMovieById(req.params.movieId);
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.code, new Date())
        }
    }
    
    async updateMovieByIdAsync (req, res){
        this.id = req.params.movieId
        this.serviceResponse = await this.service.updateMovieById(this.id,req.body)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.code, new Date())
        }
    }

    async deleteMoviByIdAsync (req, res){
        this.id = req.params.movieId
        this.serviceResponse = await this.service.deleteMovieById(this.id)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.code, new Date())
        }
    }
}

module.exports = MovieController