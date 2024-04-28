const { Movies } = require('../Models/index');
const PaginationMeta = require('../Models/PaginationMeta');
const BaseController = require('./BaseController');

/**
 * Contrôller centré sur les films
 */
class MovieController extends BaseController{
    constructor(movieServices){
        super(movieServices)
    }

    /**
     * Méthode qui permet de créer un film
     * @param {la requête} req 
     * @param {la réponse} res 
     */
    async createMovieAsync(req, res){
        let data = req.body;
        this.serviceResponse = await this.service.createMovieAsync(req, data)
        if(!this.serviceResponse.success){
            this.response.setError(this.serviceResponse.error)
            res.sendError(this.response.toPrototype(), this.serviceResponse.error.statuscode, new Date())

        }else{
            this.response.setData(this.serviceResponse.data)
            this.response.setHalData(this.halConverter.buildSingleHalObject(req,this.response.getData(),"movie"))
            res.sendData(this.response.toPrototype(),201, new Date())
        }
    }

    /**
     * Méthode qui permet de récupérer l'ensemble des films
     * @param {la requête} req 
     * @param {la réponse} res 
     */
    async getAllMoviesAsync(req,res){
        this.serviceResponse = await this.service.getAllMoviesAsync(req)

        if(!this.serviceResponse.success){
            this.response.setError(this.serviceResponse.error)
            res.sendError(this.response.toPrototype(), this.serviceResponse.error.statuscode, new Date())

        }else{
            const baseUrl = this.getBaseURL(req);
            const data = this.serviceResponse.data
            
            let query = {
                "name": req.query.name,
                "description": req.query.description,
                "page": 0,
                "limit": req.query.limit
            }

            this.response.setData(data.movies)
            let paginationObject = this._buildPaginationObject(query,baseUrl,data.nextPage,req.query.page,data.previewPage, data.pages,data.totalMovies)
            this.response.setHalData(this.halConverter.paginationHalMovies(req,this.response.getData(),paginationObject))

            let meta = new PaginationMeta(Number(req.query.page),data.pages,data.totalMovies,data.currentTotal,paginationObject.prev.href,paginationObject.next.href)

            res.sendData(this.response.toPrototype(),200, meta.toPrototype())
        }
    }

    /**
     * Méthode qui permet de récupérer un film selon son identifiant 
     * @param {la requête} req 
     * @param {la réponse} res 
     */
    async getMovieByIdAsync(req, res){
        this.serviceResponse = await this.service.getMovieById(req,req.params.movieId);
        if(this.serviceResponse.success){
            this.response.setData(this.serviceResponse.data)
            this.response.setHalData(this.halConverter.buildSingleHalObject(req,this.response.getData(),"movie"))
            res.sendData(this.response.toPrototype(),200, new Date())
        }else{
            this.response.setError(this.serviceResponse.error)
            res.sendError(this.response.toPrototype(), 404, new Date())
        }
    }
    
    /**
     * Méthode qui permet de mettre à jour un film
     * @param {la requête} req 
     * @param {la réponse} res 
     */
    async updateMovieByIdAsync (req, res){
        this.id = req.params.movieId
        this.serviceResponse = await this.service.updateMovieById(req,this.id,req.body)
        if(this.serviceResponse.success){
            this.response.setData(this.serviceResponse.data)
            this.response.setHalData(this.halConverter.buildSingleHalObject(req,this.response.getData(),"movie"))
            res.sendData(this.response.toPrototype(),200, new Date())
        }else{
            this.response.setError(this.serviceResponse.error)
            res.sendError(this.response.toPrototype(), 404, new Date())
        }
    }

    /**
     * Méthode qui permet de supprimer un film
     * @param {la requête} req 
     * @param {la réponse} res 
     */
    async deleteMoviByIdAsync (req, res){
        this.id = req.params.movieId
        this.serviceResponse = await this.service.deleteMovieById(req,this.id)
        if(this.serviceResponse.success){
            this.response.setData(this.serviceResponse.data)
            this.response.setHalData(this.serviceResponse.data)

            res.sendData(this.response.toPrototype(),200, new Date())
        }else{
            this.response.setError(this.serviceResponse.error)
            res.sendError(this.response.toPrototype(), 404, new Date())
        }
    }
}

module.exports = MovieController