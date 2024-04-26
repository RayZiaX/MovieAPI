const BaseService = require("./BaseServices");
const helper = require('../Helpers/helper')
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

    async getCategorieAndMoviesAsync(req, id){
        let paginationObject = helper.makePagination(req.query)

        console.log(paginationObject)

        let result = await req.repositories.getCategoriRepository().getCategoryAndMoviesByIdAsync(id,paginationObject.offset, paginationObject.limit)
        this.response.setStatus(result.success)
        
        if( this.response.success){
            const data = {}
            data.movieCount = result.entity.total
            data.categorie = result.entity.categorie
            data.pages = Math.ceil(result.entity.total / req.query.limit)
            data.previewPage = Number(paginationObject.currentPage - 1)
            data.nextPage = Number(paginationObject.currentPage) + 1
            this.response.setData(data)

        }else{
            this.response.setError(result.error)
        }

        return this.response.toPrototype()
    }

}

module.exports = CategoriesServices