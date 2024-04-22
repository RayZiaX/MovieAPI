const { Movies } = require('../Models/index')
const { MoviesServices } = require("../../BusinessLogicLayer/Services/moviesServices");

exports.createMovie = async (req, res) => {
    data = req.body;
    service = new MoviesServices();
    resp = await service.createMovieAsync(data)
    if(resp.success){
        res.sendData(resp.data, new Date())
    }else{
        res.sendError(resp.message, 400, new Date())
    }
}

exports.getAllMovies = async (req,res) => {
    service = new MoviesServices();
    resp = await service.getAllMoviesAsync()
    if(resp.success){
        res.sendData(resp.data, new Date())
    }else{
        res.sendError(resp.message, 400, new Date())
    }
}

exports.getMovieById = async (req, res) => {
    service = new MoviesServices();
    resp = await service.getMovieById(req.params.movieId);
    console.log(resp)
    if(resp.success){
        res.sendData(resp.data, new Date())
    }else{
        res.sendError(resp.error, 400, new Date())
    }
}

exports.updateMovieById = async (req, res) => {
    id = req.params.movieId
    service = new MoviesServices()
    resp = await service.updateMovieById(id,req.body)
    if(resp.success){
        res.sendData(resp.data, new Date())
    }else{
        res.sendError(resp.message, 400, new Date())
    }
}

exports.deleteMoviById = async (req, res) => {
    id = req.params.movieId
    service = new MoviesServices()
    resp = await service.deleteMovieById(id)
    if(resp.success){
        res.sendData(res.data, new Date())
    }else{
        res.sendError(resp.message, 400, new Date())
    }
}
