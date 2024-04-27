const BaseController = require('./BaseController')
const PaginationMeta = require('../Models/PaginationMeta')

class CategorieController extends BaseController{
    
    constructor(service){
        super(service)
    }

    async getCategorieByIdAsync(req,res){
        this.serviceResponse = await this.service.getCategorieByIdAsync(req,req.params.categorieId);
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

    async getCategorieAndMoviesAsync(req,res){
        let id = req.params.categorieId
        this.serviceResponse = await this.service.getCategorieAndMoviesAsync(req,id)

        if(this.serviceResponse.success){
            const baseUrl = this.getBaseURL(req);
            const data = this.serviceResponse.data
            let response = {}
            let query = {
                "page": undefined,
                "limit": req.query.limit
            }

            let paginationObject = this._buildPaginationObject(query,baseUrl,data.nextPage,Number(req.query.page),data.previewPage,data.pages)
            
            response.categorie = data.categorie
            response.halData = this.halConverter.paginationHalCategories(req,response.categorie,paginationObject)
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

}

module.exports = CategorieController