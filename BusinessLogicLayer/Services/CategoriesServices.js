const BaseService = require("./BaseServices");

class CategoriesServices extends BaseService{
    constructor(){
        super()
    }

    async getCategorieByIdAsync (req,id){
        let result = await req.repositories.getCategoriRepository().getByIdAsync(id)
        this.response.setStatus(result.success)
        if(this.response.success){
            this.response.setData(result.entity)
        }else{
            this.response.setError(result.error)
        }

        return this.response.toPrototype()
    }
}

module.exports = CategoriesServices