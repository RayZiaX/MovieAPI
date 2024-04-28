const fs = require('fs')
const contextInstance = require('../../Contexts/movieContextInstance');

exports.closeConnexion = () => {
    contextInstance.close().then(()=>{
        if((process.env.ENV == "DEV" || process.env.ENV == "TEST") && process.env.DB_DIALECT == "sqlite"){
            fs.unlinkSync(contextInstance.options.storage);
        }
        process.exit(0);
    }).catch(error=>{
        console.log(`Erreur lors de la fermeture de la connexion Sequelize: ${error}`)
        process.exit(1)
    })
}

