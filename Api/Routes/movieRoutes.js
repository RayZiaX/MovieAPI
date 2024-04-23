const MovieController = require('../Controllers/moviesControler');
const express = require('express')
const middleware = require('../Middleware/checkEntryMovies');
const MoviesServices = require('../../BusinessLogicLayer/Services/moviesServices');

const router = express.Router();

const service = new MoviesServices()
const controller = new MovieController(service)

router
    .get('/movie/:movieId', middleware.checkIdMovie,controller.getMovieByIdAsync.bind(controller))
    .put('/movie/:movieId', middleware.checkIdMovie,middleware.checkNameMovie,middleware.checkDescription,middleware.checkDate,controller.updateMovieByIdAsync.bind(controller))
    .delete('/movie/:movieId', middleware.checkIdMovie,controller.deleteMoviByIdAsync.bind(controller));

router
    .post('/movie', middleware.checkDescription, middleware.checkNameMovie, middleware.checkDate,controller.createMovieAsync.bind(controller))
    .get('/movie', controller.getAllMoviesAsync.bind(controller));

module.exports = router