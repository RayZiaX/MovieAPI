const BaseService = require("./BaseServices");
const helper = require('../Helpers/helper');
const ErrorResponseServices = require("./ResponsesServices/ErrorResponseServices");
const BoMovie = require('./BusinessObjects/BoMovie')

/**
 * Classe centré sur les films elle permet d'appliquer les différentes règle métier autour des films
 */
class MoviesServices extends BaseService{
    constructor(){
        super()
    }

    /**
     * Méthode qui permet de créer un film en asynchrone
     * @param {la requête de l'api qui contient les elements essentiel pour le fonctionnement du service} req 
     * @param {le corps de la requête} body 
     * @returns une réponse contenant un status (true/false) de l'état du processus et de la données qu'elle contient une erreur ou l'entité nouvellement créer
     */
    async createMovieAsync(req,body) {
        let categoriesId = body.categoriesId

        let boMovie = new BoMovie({id: undefined, name: body.name, description: body.description, date: body.date})
        let ckecking = boMovie.checkData({ignoreId:true})

        if(!ckecking.ok){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices(ckecking.error,422).toPrototype())
            return this.response.toPrototype()
        }

        if(categoriesId == undefined || categoriesId.length <= 0){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices("un film doit avoir au moins 1 catégorie",422).toPrototype())
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

    /**
     * Méthode qui permet de récupérer l'ensemble des films en asynchrone
     * @param {la requête} req 
     * @returns une réponse contenant un status (true/false) de l'état du processus et de la données qu'elle contient une erreur ou les films récupérés avec une méta contenant la pagination
     */
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

    /**
     * Méthode qui permet de récupérer un film selon son identifiant
     * @param {la requête} req 
     * @param {l'identifiant du film} id 
     * @returns une réponse contenant un status (true/false) de l'état du processus et de la données qu'elle contient une erreur ou l'entité
     */
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

    /**
     * Méthode qui permet de mettre à jour le film selon son identifiant
     * @param {la requête} req 
     * @param {l'identifiant du film} id 
     * @param {le corps de la requête avec les informations pour modifier le film} body 
     * @returns une réponse contenant un status (true/false) de l'état du processus et de la données qu'elle contient une erreur ou l'entité nouvellement créer
     */
    async updateMovieById(req,id,body){

        let categoriesId = body.categoriesId
        let boMovie = new BoMovie({id: id, name: body.name, description: body.description, date: body.date})
        let ckecking = boMovie.checkData({ignoreId:false})
        if(!ckecking.ok){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices(ckecking.error,401))
            return this.response.toPrototype()
        }
        if(categoriesId == undefined || categoriesId.length <= 0){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices("un film doit avoir au moins 1 catégorie",422))
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

    /**
     * Méthode qui permet de supprimer un film selon son identifiant 
     * @param {la requête} req 
     * @param {l'identifiant du film} id 
     * @returns une réponse contenant un status (true/false) de l'état du processus et de la données qu'elle contient une erreur ou un message
     */
    async deleteMovieById(req,id){

        if(id === undefined || id <= 0 || isNaN(id)){
            this.response.setStatus(false)
            this.response.setError(new ErrorResponseServices("l'identifiant n'existe pas",400))
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
}

module.exports = MoviesServices 