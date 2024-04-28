const DefaultMeta = require('../../Models/DefaultMeta')

exports.checkStatusCategorie = (req,res,next) => {
    if(req.query.catStatus == undefined){
        return res.sendError({message:"la requête nécéssite un statut pour la recherche"},400, new DefaultMeta().toPrototype())
    }
    next();
}