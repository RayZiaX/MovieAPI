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

exports.checkNameMovie = (req, res, next) =>{
    body = req.body;
    if(body.name == undefined){
        return res.sendError({message: "un film doit contenir un nom"},400, {timespan: new Date()})
    }

    if(body.name.length > 128){
        return res.sendError({message: "le nom du film ne doit pas dépasser plus de 128 charactères"}, 400, {timespan: new Date()})
    }

    next()
}

exports.checkDescription = (req, res, next) => {
    body = req.body;
    if(body.description == undefined){
        return res.sendError({message: "un film doit contenir une description"},400, {timespan: new Date()})
    }

    if(body.description.length > 2048){
        return res.sendError({message: "la description du film ne doit pas dépasser plus de 2048 charactères"}, 400, {timespan: new Date()})
    }

    next()
}

exports.checkDate = (req,res,next) => {
    body = req.body;
    if(body.date == undefined){
        return res.sendError({message: "un film doit contenir une date"},400, {timespan: new Date()})
    }
    next()
}