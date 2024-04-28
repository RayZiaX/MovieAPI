const BaseController = require('./BaseController')
const PaginationMeta = require('../Models/PaginationMeta')
/**
 * Contrôleur centré sur les catégories
 */
class CategorieController extends BaseController{
    constructor(service){
        super(service)
    }

    /**
     * Méthode qui permet de récupérer une catégorie selon son identifiant
     * @param {la requête} req 
     * @param {la réponse} res 
     */
    async getCategorieByIdAsync(req,res){
        this.serviceResponse = await this.service.getCategorieByIdAsync(req,req.params.categorieId);
        if(this.serviceResponse.success){
            this.response.setData(this.serviceResponse.data)
            this.response.setHalData(this.halConverter.buildSingleHalObject(req,this.response.getData(),"categorie"))
            res.sendData(this.response.toPrototype(),200, new Date())
        }else{
            this.response.setError(this.serviceResponse.error)
            res.sendError(this.response.getError(), this.serviceResponse.error.statuscode, new Date())
        }
    }

    /**
     * Méthode qui permet de récupérer une catégorie avec ses flims
     * @param {la requête} req 
     * @param {la réponse} res 
     */
    async getCategorieAndMoviesAsync(req,res){
        let id = req.params.categorieId
        this.serviceResponse = await this.service.getCategorieAndMoviesAsync(req,id)
        let query = {
            "page": undefined,
            "limit": req.query.limit
        }
        
        if(this.serviceResponse.success){
            const baseUrl = this.getBaseURL(req);
            const data = this.serviceResponse.data

            
            let paginationObject = this._buildPaginationObject(query,baseUrl,data.nextPage,Number(req.query.page),data.previewPage,data.pages,data.movieCount)

            this.response.setData(data.categorie)
            this.response.setHalData(this.halConverter.paginationHalCategories(req,this.response.getData(),paginationObject))
            let meta = new PaginationMeta(Number(req.query.page),data.pages,data.movieCount,data.currentCountMovie,paginationObject.prev.href,paginationObject.next.href)
            this.response.setMeta(meta)
            res.sendData(this.response,200, meta.toPrototype())

        }else{
            this.response.setError(this.serviceResponse.error)
            res.sendError(this.response.getError(), this.serviceResponse.error.statuscode, new Date())
        }
    }

}

module.exports = CategorieController