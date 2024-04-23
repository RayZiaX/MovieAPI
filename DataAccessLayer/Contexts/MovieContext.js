require('dotenv').config()
const { Sequelize } = require('sequelize');

class MovieContext extends Sequelize{
    constructor(dbname,username, password, host, provider){
        super(dbname,username,password,{
            host: host,
            dialect: provider,
            logging: process.env.ENV === "DEV" && process.env.DB_LOG === "true"
        })
    }

    async testConnexionAsync(){
        try {
            await this.authenticate();
            return {
                success: true,
                message: "Connexion établie",
                code: 200
            }
        } catch (error) {
            return {
                success: true,
                error: {
                    message: `une erreur à été rencontré durant la connexion à la base de données: ${error}`,
                    code: 500
                }
            }
        }
    }
}

module.exports = MovieContext 