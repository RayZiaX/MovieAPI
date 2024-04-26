// contrôleurs & services
const CategorieController = require('../Controllers/CategorieController');
const CategoriesServices = require('../../BusinessLogicLayer/Services/CategoriesServices');
const service = new CategoriesServices()
const controller = new CategorieController(service)

// express
const express = require('express')
const router = express.Router();

// middlewares
const queryMiddleware = require('../Middleware/Securities/defaultCheckingQuery');
const queryCategorieMiddleware = require('../Middleware/Securities/checkQueryCategories')


router.get('/categorie/:categorieId', controller.getCategorieByIdAsync.bind(controller));
router.get('/categorie/:categorieId/movies',queryMiddleware.checkExistQuery,queryMiddleware.checkLimit,queryMiddleware.checkPage, controller.getCategorieAndMoviesAsync.bind(controller))
//router.get('/categories',queryMiddleware.checkExistQuery,queryMiddleware.checkLimit,queryMiddleware.checkPage,queryCategorieMiddleware.checkStatusCategorie, controller)

module.exports = router