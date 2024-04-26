const DefaultMeta = require('../../Models/DefaultMeta')

exports.checkNameMovie = (req,res,next) => {
    if(req.query.name == undefined){
        return res.sendError({message:"la requête nécéssite un nom pour la recherche"},400, new DefaultMeta().toPrototype())
    }
    next();
}