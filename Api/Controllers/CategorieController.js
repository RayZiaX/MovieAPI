const BaseController = require('./BaseController')


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
}

module.exports = CategorieController