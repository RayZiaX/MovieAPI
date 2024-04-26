const { DESCRIBE } = require("sequelize/lib/query-types");
const BaseService = require("./BaseServices");

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

        this.result = await req.repositories.getMovieRepository().createMovieWithCategorieAsync(data);
        this.response.setStatus(this.result.success)
        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async getAllMoviesAsync(req){
        const page = req.query.page;
        if(page === 0){
            page = 1
        }
        const offset = (page - 1) * req.query.limit;

        this.result = await req.repositories.getMovieRepository().getMoviesByName(req.query.name, req.query.limit,offset)
        this.response.setStatus(this.result.success)

        if(this.response.success){
            const data = {}
            data.movieCount = this.result.entity.count
            data.movies = this.result.entity.rows
            data.pages = Math.round(this.result.entity.count / req.query.limit)
            data.previewPage = Number(page - 1)
            data.nextPage = Number(page) + 1

            this.response.setData(data)
        }else{
            this.response.setError(this.result.error)
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
}

module.exports = MoviesServices 