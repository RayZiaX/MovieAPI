const DefaultMeta = require('../Models/DefaultMeta')

exports.checkExistQuery = (req,res,next) => {
    if(req.query == undefined || req.query == {}){
        return res.sendError({message:"requête invalide"},400, new DefaultMeta().toPrototype())
    }
    next();
}

exports.checkNameMovie = (req,res,next) => {
    if(req.query.name == undefined){
        return res.sendError({message:"la requête nécéssite un nom pour la recherche"},400, new DefaultMeta().toPrototype())
    }
    next();
}

exports.checkPage = (req,res,next) => {
    if(req.query.page == undefined){
        return res.sendError({message:"la requête nécéssite une page pour la recherche"},400, new DefaultMeta().toPrototype())
    }

    if(isNaN(req.query.page)){
        return res.sendError({message:"la valeur de page n'est pas conforme pour la recherche"},400, new DefaultMeta().toPrototype())
    }

    next();
}

exports.checkLimit = (req,res,next) => {
    if(req.query.limit == undefined){
        return res.sendError({message:"la requête nécéssite une limite pour la recherche"},400, new DefaultMeta().toPrototype())
    }

    if(isNaN(req.query.limit) || req.query.limit <= -1){
        return res.sendError({message:"la valeur de limit n'est pas conforme pour la recherche"},400, new DefaultMeta().toPrototype())
    }

    if(req.query.limit > 50){
        return res.sendError({message:"la limit ne peut pas dépasser 50"},400, new DefaultMeta().toPrototype())
    }

    next();
}