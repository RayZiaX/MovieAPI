const createMovie = require('./Movies/movieCreateModel')
const updateMovie = require('./Movies/movieUpdateModel')
const movie = require('./Movies/movieModels')

module.exports = {
    Movies:{
        createMovie,
        updateMovie,
        movie
    }
}