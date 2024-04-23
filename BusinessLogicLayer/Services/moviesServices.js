const MovieServicesResponse = require("./ResponsesServices/MovieServicesResponse")

class MoviesServices{
    constructor(){
        this.response = new MovieServicesResponse();
    }

    async createMovieAsync(req,data) {
        this.result = await req.repositories.getMovieRepository().createAsync(data);
        this.response.setStatus(this.result.success)

        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async getAllMoviesAsync(req){
        this.result = await req.repositories.getMovieRepository().getAllAsync()
        this.response.setStatus(this.result.success)
        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async getMovieById(req,id){
        this.result = await req.repositories.getMovieRepository().getByIdAsync(id)
        this.response.setStatus(this.result.success)

        if(this.result.success){
            this.response.setData(this.result.entity)
        }else{
            this.response.setError(this.result.error)
        }
        return this.response.toPrototype()
    }

    async updateMovieById(req,id,data){
        this.result = await req.repositories.getMovieRepository().updateAsync(id,data)
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