const { Movies } = require('../Models/index');
const PaginationMeta = require('../Models/PaginationMeta');
const BaseController = require('./BaseController');

class MovieController extends BaseController{
    constructor(movieServices){
        super(movieServices)
    }

    async createMovieAsync(req, res){
        this.data = req.body;
        this.serviceResponse = await this.service.createMovieAsync(req,this.data)
        if(this.serviceResponse.success){
            res.sendData(this.serviceResponse.data,201, new Date())
        }else{
            if(this.config.environment === "DEV"){
                res.sendDevError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date(), this.serviceResponse.error.technicalMessage)
            }else{
                res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date())
            }
        }
    }

    async getAllMoviesAsync(req,res){
        this.serviceResponse = await this.service.getAllMoviesAsync(req)
        if(this.serviceResponse.success){
            const baseUrl = this.getBaseURL(req);
            const data = this.serviceResponse.data
            let query = {
                "name": req.query.name,
                "page": data.nextPage,
                "limit": req.query.limit
            }
            let nextPageUrl = this.buildQueryRequest(baseUrl,query);
            let prevPageUrl = undefined;
            
            if(data.previewPage >= 1){
                query["page"] = data.previewPage
                prevPageUrl = this.buildQueryRequest(baseUrl,query)
            }

            let meta = new PaginationMeta(Number(req.query.page),data.pages,data.movieCount,prevPageUrl,nextPageUrl)
            
            res.sendData(data.movies,200, meta)
        }else{
            if(this.config.environment === "DEV"){
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
            if(this.config.environment === "DEV"){
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
            if(this.config.environment === "DEV"){
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
            if(this.config.environment === "DEV"){
                res.sendDevError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date(), this.serviceResponse.error.technicalMessage)
            }else{
                res.sendError(this.serviceResponse.error.message, this.serviceResponse.error.statuscode, new Date())
            }
        }
    }
}

module.exports = MovieController