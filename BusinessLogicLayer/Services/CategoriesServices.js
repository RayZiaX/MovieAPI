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

    async getCategorieAndMoviesAsync(req, id){
        let  page = req.query.page;
        if(page === 0){
            page = 1
        }
        let offset = (page - 1) * req.query.limit;
        if(offset == 0){
            offset = req.query.limit
        }
        let result = await req.repositories.getCategoriRepository().getCategoryAndMoviesByIdAsync(id, req.query.limit,offset)
        this.response.setStatus(result.success)
        
        if( this.response.success){
            const data = {}
            data.movieCount = result.entity.total
            data.categorie = result.entity.categorie
            data.pages = Math.round(result.entity.total / req.query.limit)
            data.previewPage = Number(page - 1)
            data.nextPage = Number(page) + 1
            this.response.setData(data)

        }else{
            this.response.setError(result.error)
        }

        return this.response.toPrototype()
    }

}

module.exports = CategoriesServices