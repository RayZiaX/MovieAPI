const { Sequelize } = require('sequelize');

class MovieContext extends Sequelize{
    constructor(dbname,username, password, host, provider){
        super(dbname,username,password,{
            host: host,
            dialect: provider
        })
    }

    async testConnexionAsync(){
        try {
            await this.authenticate();
            console.log("Connexion établie")
        } catch (error) {
            console.error(error)
        }
    }
}

module.exports = { MovieContext }