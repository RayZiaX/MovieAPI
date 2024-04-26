const DefaultMeta = require('../../Models/DefaultMeta')

exports.checkExistQuery = (req,res,next) => {
    if(req.query == undefined || req.query == {}){
        return res.sendError({message:"requête invalide"},406, new DefaultMeta().toPrototype())
    }
    next();
}

exports.checkPage = (req,res,next) => {
    if(req.query.page == undefined){
        req.query.page = 1
    }

    if(isNaN(req.query.page)){
        return res.sendError({message:"la valeur de page n'est pas conforme pour la recherche"},400, new DefaultMeta().toPrototype())
    }

    next();
}

exports.checkLimit = (req,res,next) => {
    if(req.query.limit == undefined){
        req.query.limit = 10
    }

    if(isNaN(req.query.limit) || req.query.limit <= -1){
        return res.sendError({message:"la valeur de limit n'est pas conforme pour la recherche"},400, new DefaultMeta().toPrototype())
    }

    if(req.query.limit > 50){
        return res.sendError({message:"la limit ne peut pas dépasser 50"},400, new DefaultMeta().toPrototype())
    }

    next();
}