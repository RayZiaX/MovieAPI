const express = require('express')
const router = express.Router();
const controller = require('../Controllers/moviesControler')
const middleware = require('../Middleware/checkEntryMovies')
router
    .get('/movie/:movieId', middleware.checkIdMovie,controller.getMovieById)
    .put('/movie/:movieId', middleware.checkIdMovie,controller.updateMovieById)
    .delete('/movie/:movieId', middleware.checkIdMovie,controller.deleteMoviById);

router
    .post('/movie', controller.createMovie)
    .get('/movie', controller.getAllMovies);

module.exports = router;