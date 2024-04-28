function logger (req,res,next){
    //console.log(`requête venant de ${req.get('User-Agent')}, pour la route ${req.path} en utilisant la méthode ${req.method}`)
    next();
}


module.exports = logger