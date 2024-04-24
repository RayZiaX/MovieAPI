const { Movies } = require('../Models/index');
require('dotenv').config()
class MovieController{
    constructor(movieServices){
        this.service = movieServices;
        this.serviceResponse = undefined;
    }

    async createMovieAsync(req, res){
        this.data = req.body;
        this.serviceResponse = await this.service.createMovieAsync(req,this.data)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,201, new Date())
        }else{
            if(process.env.ENV === "DEV"){
                res.sendDevError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date(), this.serviceResponse.error.technicalMessage)
            }else{
                res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date())
            }
        }
    }

    async getAllMoviesAsync(req,res){
        this.serviceResponse = await this.service.getAllMoviesAsync(req)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            if(process.env.ENV === "DEV"){
                res.sendDevError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date(), this.serviceResponse.error.technicalMessage)
            }else{
                res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date())
            }
        }
    }

    async getMovieByIdAsync(req, res){
        this.serviceResponse = await this.service.getMovieById(req,req.params.movieId);
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            if(process.env.ENV === "DEV"){
                res.sendDevError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date(), this.serviceResponse.error.technicalMessage)
            }else{
                res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date())
            }
        }
    }
    
    async updateMovieByIdAsync (req, res){
        this.id = req.params.movieId
        this.serviceResponse = await this.service.updateMovieById(req,this.id,req.body)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            if(process.env.ENV === "DEV"){
                res.sendDevError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date(), this.serviceResponse.error.technicalMessage)
            }else{
                res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date())
            }
        }
    }

    async deleteMoviByIdAsync (req, res){
        this.id = req.params.movieId
        this.serviceResponse = await this.service.deleteMovieById(req,this.id)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,200, new Date())
        }else{
            if(process.env.ENV === "DEV"){
                res.sendDevError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date(), this.serviceResponse.error.technicalMessage)
            }else{
                res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date())
            }
        }
    }
}

module.exports = MovieController