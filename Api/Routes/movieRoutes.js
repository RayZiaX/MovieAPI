const express = require('express')
const router = express.Router();

// déclarations controller et services
const MovieController = require('../Controllers/moviesController');
const MoviesServices = require('../../BusinessLogicLayer/Services/moviesServices');
const service = new MoviesServices()
const controller = new MovieController(service)

// middlewares
const middleware = require('../Middleware/Securities/checkEntryMovies');
const queryMiddleware = require('../Middleware/Securities/defaultCheckingQuery');
const queryMovieMiddleware = require('../Middleware/Securities/checkQueryMovies');

router
    .get('/movie/:movieId', middleware.checkIdMovie,controller.getMovieByIdAsync.bind(controller))
    .put('/movie/:movieId', middleware.checkIdMovie,middleware.checkNameMovie,middleware.checkDescription,middleware.checkDate,controller.updateMovieByIdAsync.bind(controller))
    .delete('/movie/:movieId', middleware.checkIdMovie,controller.deleteMoviByIdAsync.bind(controller));

router
    .post('/movie', middleware.checkDescription, middleware.checkNameMovie, middleware.checkDate,controller.createMovieAsync.bind(controller))
    .get('/movie', queryMiddleware.checkExistQuery, queryMovieMiddleware.checkNameMovie, queryMiddleware.checkPage, queryMiddleware.checkLimit, controller.getAllMoviesAsync.bind(controller));

module.exports = router