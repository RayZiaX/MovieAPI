const MovieContext = require('../../DataAccessLayer/Contexts/MovieContext')
const Repositories = require('../../DataAccessLayer/Repositories/Repositories')
require("dotenv").config()

async function injectContext(req,res,next){
    movieContext = new MovieContext(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,process.env.DB_HOST,"postgres")
    result = await movieContext.testConnexionAsync()
    if(!result.success){
        next(result.error)
    }else{
        req.repositories = new Repositories(movieContext)
        next()
    }
}

module.exports = injectContext;
