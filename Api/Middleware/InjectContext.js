const instance = require('../../DataAccessLayer/Contexts/movieContextInstance')
const Repositories = require('../../DataAccessLayer/Repositories/Repositories')

async function injectContext(req,res,next){

    instance.authenticate().then(()=>{
    }).catch((error)=>{
        console.error(`Impossible de se connecter à la base de données: ${error}`)
        next(error)
        return
    })
    
    req.repositories = new Repositories(instance)
    next()
}

module.exports = injectContext;
