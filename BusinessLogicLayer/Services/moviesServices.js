const BaseService = require("./BaseServices");
const helper = require('../Helpers/helper')

class MoviesServices extends BaseService{
    constructor(){
        super()
    }

    async createMovieAsync(req,body) {
        let data = {
            name: body.name,
            description: body.description,
            date: body.date,
            categorieId: body.categorieId
        }

        let result = await req.repositories.getMovieRepository().createMovieWithCategorieAsync(data);

        this.response.setStatus(result.success)
        if(result.success){
            result.entity.date = result.entity.date
            this.response.setData(result.entity)
        }else{
            this.response.setError(result.error)
        }
        return this.response.toPrototype()
    }

    async getAllMoviesAsync(req){
        let paginationObject = helper.makePagination(req.query)

        let result = await req.repositories.getMovieRepository().getMoviesByCriteria(req.query.name, req.query.description, paginationObject.limit, paginationObject.offset)
        this.response.setStatus(result.success)
        if(this.response.success){
            const data = {}
            data.movieCount = result.entity.count
            data.movies = result.entity.rows

            data.pages = Math.ceil(result.entity.count / req.query.limit)
            data.previewPage = Number(paginationObject.currentPage - 1)
            data.nextPage = Number(paginationObject.currentPage) + 1
            this.response.setData(data)
        }else{
            this.response.setError(result.error)
        }
        return this.response.toPrototype()
    }

    async getMovieById(req,id){
        this.result = await req.repositories.getMovieRepository().getMovieAndCategorieById(id)
        this.response.setStatus(this.result.success)

        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async updateMovieById(req,id,body){
        const data = {
            name: body.name,
            description: body.description,
            date: body.date,
            categorieId: body.categorieId
        }
        this.result = await req.repositories.getMovieRepository().updateMovieAsync(id,data)
        this.response.setStatus(this.result.success)
        
        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response
    }

    async deleteMovieById(req,id){
        this.result = await req.repositories.getMovieRepository().deleteAsync(id)
        this.response.setStatus(this.result.success)
        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
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
        let halEntity = new HalHelper(copy).toObject(req,"movie",copy.idMovie)
        halEntity._embedded = {
            categories: arrCatHal
        }
        return halEntity
    }

}

module.exports = MoviesServices 