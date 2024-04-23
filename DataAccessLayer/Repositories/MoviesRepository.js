const initUserModel = require('../Entities/movie');
const BaseRepository = require('./BaseRepository')

class MoviesRepository extends BaseRepository{
    constructor(context){
        super(initUserModel(context),"Movie");
    }
}


module.exports = MoviesRepository
