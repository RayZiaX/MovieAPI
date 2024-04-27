const { Movies } = require('../Models/index');
const PaginationMeta = require('../Models/PaginationMeta');
const BaseController = require('./BaseController');
class MovieController extends BaseController{
    constructor(movieServices){
        super(movieServices)
    }

    async createMovieAsync(req, res){
        let data = req.body;
        this.serviceResponse = await this.service.createMovieAsync(req, data)
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
            let response = {
                data: this.serviceResponse.data,
                halData: []
            }

            let query = {
                "name": req.query.name,
                "description": req.query.description,
                "page": data.nextPage,
                "limit": req.query.limit
            }
            
            let paginationObject = this._buildPaginationObject(query,baseUrl,data.nextPage,req.query.page,data.previewPage, data.pages)
            response.halData = this.halConverter.paginationHalMovies(req,data.movies,paginationObject)
            let meta = new PaginationMeta(Number(req.query.page),data.pages,data.movieCount,paginationObject.prev.href,paginationObject.next.href)

            res.sendData(response,200, meta)
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

    _toHal(req,entity,paginationObject){
        let copy = Object.assign({}, entity)
        let categories = Object.assign([],copy.categories)
        let arrCatHal = []
        delete copy.categories
        if(categories != undefined){
            categories.forEach(cat => {
                arrCatHal.push(new HalHelper(cat).toObject(req,"categorie",cat.idCategorie))
            });
        }
        let halEntity = new HalHelper(copy).toObject(req,"movie",copy.idMovie,paginationObject)
        halEntity._embedded = {
            categories: arrCatHal
        }
        return halEntity
    }

   /**
    * Méthode qui pêrmet de construire l'objet de pagination
    * @param {*} query 
    * @param {*} baseUrl 
    * @param {*} nextPage 
    * @param {*} currentPage 
    * @param {*} previewPage 
    * @param {*} last 
    * @returns un objet pour la pagination
    */
    _buildPaginationObject(query,baseUrl,nextPage,currentPage,previewPage, last){
        
        let paginationObject = {
            next:{},
            prev: {},
            current: {},
            first: {},
            last: {}
        }
        
        query["page"] = nextPage
        paginationObject.next = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        if(previewPage >= 1){
            query["page"] = previewPage
            paginationObject.prev = {
                href: this.buildQueryRequest(baseUrl,query)
            }
        }

        query["page"] = currentPage
        paginationObject.current = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        query["page"] = 1
        paginationObject.first = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        query["page"] = last
        paginationObject.last = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        return paginationObject;
    }
}

module.exports = MovieController