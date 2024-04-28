const BaseService = require("./BaseServices");
const helper = require('../Helpers/helper');
const ErrorResponseServices = require("./ResponsesServices/ErrorResponseServices");
const BoMovie = require('./BusinessObjects/BoMovie')
class MoviesServices extends BaseService{
    constructor(){
        super()
    }

    async createMovieAsync(req,body) {
        let categoriesId = body.categoriesId

        let boMovie = new BoMovie({id: undefined, name: body.name, description: body.description, date: body.date})
        let ckecking = boMovie.checkData({ignoreId:true})

        if(!ckecking.ok){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices(ckecking.error,401).toPrototype())
            return this.response.toPrototype()
        }

        if(categoriesId == undefined || categoriesId.length <= 0){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices("un film doit avoir au moins 1 catégorie",401).toPrototype())
            return this.response.toPrototype()
        }

        let checkingValue = boMovie.toPrototype()
        let result = await req.repositories.getCategoriRepository().existsRange(categoriesId)
        
        if(result.success){
            result = await req.repositories.getMovieRepository().createMovieWithCategorieAsync({data:{
                name:checkingValue.name, description:checkingValue.description,
                date:checkingValue.date, categoriesId: categoriesId},tracking:false});
        }

        this.response.setStatus(result.success)

        if(result.success){
            this.response.setData(result.entity)
        }else{
            this.response.setError(result.error)
        }
        return this.response.toPrototype()
    }

    async getAllMoviesAsync(req){
        let paginationObject = helper.makePagination(req.query)

        let result = await req.repositories.getMovieRepository().getMoviesByCriteria({
            name:req.query.name, description:req.query.description
            , limit:paginationObject.limit, offset:paginationObject.offset
            , trackin:false
        })

        this.response.setStatus(result.success)
        if(this.response.success){
            const data = {}
            data.totalMovies = result.entity.count
            data.movies = result.entity.rows
            data.currentTotal = data.movies.length
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
        let result = await req.repositories.getMovieRepository().getMovieAndCategorieById({id:id, tracking:false})
        this.response.setStatus(result.success)
        if(result.success){
            this.response.setData(result.entity)
        }else{
            this.response.setError(result.error)
        }
        return this.response.toPrototype()
    }

    async updateMovieById(req,id,body){

        let categoriesId = body.categoriesId
        console.log(id)

        let boMovie = new BoMovie({id: id, name: body.name, description: body.description, date: body.date})
        let ckecking = boMovie.checkData({ignoreId:false})
        if(!ckecking.ok){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices(ckecking.error,401))
            return this.response.toPrototype()
        }
        console.log(categoriesId)
        if(categoriesId == undefined || categoriesId.length <= 0){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices("un film doit avoir au moins 1 catégorie",401))
            return this.response.toPrototype() 
        }

        let checkingValue = boMovie.toPrototype()

        if(this.response.success){
            
            let movieExist = await req.repositories.getMovieRepository().existsByIdAsync(id)

            if(!movieExist){
                this.response.setStatus(false)
                this.response.setError(new ErrorResponseServices("le film n'existe pas", 404))
                return this.response.toPrototype()
            }

            let result = await req.repositories.getCategoriRepository().existsRange(categoriesId)
            
            if(result.success){
                result = await req.repositories.getMovieRepository().updateMovieAsync(
                    {id:id,data:{
                    name:checkingValue.name, description:checkingValue.description,
                    date:checkingValue.date, categoriesId: categoriesId}
                    ,tracking:false})
            }

            this.response.setStatus(result.success)
            if(result.success){
                this.response.setData(result.entity)
            }else{
                this.response.setError(result.error)
            }
        }

        return this.response.toPrototype()
    }

    async deleteMovieById(req,id){

        if(id === undefined || id <= 0 || isNaN(id)){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices("l'identifiant n'existe pas",401))
            return this.response.toPrototype() 
        }

        this.result = await req.repositories.getMovieRepository().deleteAsync({id:id})

        this.response.setStatus(this.result.success)
        
        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    _checkingDataMovie(boObject, ignoreId){
        return 
    }
}

module.exports = MoviesServices 