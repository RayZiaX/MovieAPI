const express = require("express")
const app = express()

exports.checkIdMovie = (req,res,next) => {
    if(req.params.movieId == undefined){
        console.log("pas d'id")
        return res.sendError({message:"l'identifiant ne peux pas être null"},400, {timespan: new Date()});
    }

    if(req.params.movieId == 0){
        return res.sendError({message:"l'identifiant ne peux pas être 0"},400, {timespan: new Date()});
    }

    next();
}