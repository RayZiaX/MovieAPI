// contrôleurs & services
const CategorieController = require('../Controllers/CategorieController');
const CategoriesServices = require('../../BusinessLogicLayer/Services/CategoriesServices');
const service = new CategoriesServices()
const controller = new CategorieController(service)

// express
const express = require('express')
const router = express.Router();

// middlewares
const queryMiddleware = require('../Middleware/defaultCheckingQuery');

router.get('/categorie/:categorieId', controller.getCategorieByIdAsync.bind(controller));
//router.get('/categorie/:categorieId/movies', queryMovieMiddleware.checkExistQuery, queryMovieMiddleware.checkNameMovie, queryMovieMiddleware.checkPage, queryMovieMiddleware.checkLimit, controller.getAllMoviesAsync.bind(controller));

module.exports = router