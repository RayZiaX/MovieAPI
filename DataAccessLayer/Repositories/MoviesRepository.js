const Movie = require('../Entities/movie')

class MoviesRepository{

    constructor(){

    }

    async createMovieAsync(data) {

        try {
            const {name, description, date} = data
            const movie = await Movie.create({name, description, date});
            return {
                success: true,
                movie: movie
            }
            
        } catch (error) {
            return {
                success: false,
                error:{
                    message: `une erreur c'est produite durant la création du film: ${error}`,
                    code: 500
                }
            }
        }
    }

    async getAll(){
        try {
            const movies = await Movie.findAll();
            return {
                success: true,
                movies: movies
            }
        } catch (error) {
            return {
                success: false,
                error: {
                    message: `Une erreur est survenu ${error}`,
                    code: 500
                }
            }
        }
    }

    async deteteMovie(id){
        try {
            this.result = await Movie.destroy({where: {id_movie: id}})
            if(this.result > 0){
                return {
                    success: true,
                    message: "le filme a été supprimé"
                }
            }else{
                return {
                    success: false,
                    message: "le filme n'a pas été supprimé"
                }
            }
        } catch (error) {
            return {
                success: false,
                message: `une erreur à été rencontré durant la suppression: ${error}`
            }
        }
    }

    async updateMovie(id,data){
        try {
            const {name, description, date} = data
            this.result = await Movie.update({
                name: name,
                description: description,
                date: date
            }, {where: {id_movie: id}})

            if(this.result[0] > 0){
                this.movie = await Movie.findByPk(id);
                return {
                    success: true,
                    movie: this.movie
                }
            }else{
                return{
                    success: false,
                    error:{
                        message: "Aucun utilisateur n'a été modifié",
                        code: 500
                    }
                }
            }
        } catch (error) {
            return {
                message: `une erreur a été réncontré durant la mise à jour: ${error}`,
                code: 500
            }
        }
    }

    async getById(id){
        try {
            const movie = await Movie.findByPk(id);
            if (movie) {
                return {
                    success: true,
                    movie: movie
                }
            } else {
                return {
                    success: false,
                    message: `le film n'as pas été trouvé`
                }
            }
        } catch (error) {
            return {
                success: false,
                message: `Une erreur a été rencontré durant la récupération d'un film: ${error}`
            }
        }
    }
}


module.exports = MoviesRepository
