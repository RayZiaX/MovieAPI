const {Builder} = require('xml2js')

function sendResponse(req,res, {data = {}, error = {}, meta = { timespan: new Date()}, statusCode = 400, technicalError = undefined}){
    const responseObject = {
        data: data || {},
        error: error || {},
        meta: meta
    }

    if(technicalError == undefined && process.env.ENV == "DEV"){
        responseObject.error.technicalError = technicalError
    }

    if(req.accepts('*/*')){
        res.status(statusCode).json(responseObject)
    }else if(req.accepts('application/xml')){
        const xml = new Builder().buildObject(responseObject)
        res.status(statusCode)
        res.set('Content-Type', 'application/xml')
        res.send(xml)
    }else if(req.accepts('application/json')){
        res.status(statusCode).json(responseObject)
    }else{
        res.status(406).set('Content-Type', 'text/plain').send("type not reconized")
    }
}

function templateResponse (req,res,next){
    res.sendData = (data,statusCode = 200, meta = { timespan: new Date()}) => {
        sendResponse(req,res, {data: data, statusCode: statusCode, meta: meta})
    };

    res.sendError = (error, statusCode = 400, meta = { timespan: new Date()}) => {
        sendResponse(req,res, {error: error, statusCode: statusCode, meta: meta})
    };
    res.sendDevError = (error, statusCode = 400, meta = { timespan: new Date()},technicalError)=>{
        sendResponse(req,res,{error: error, statusCode: statusCode, meta: meta, technicalError: technicalError})
    }
    next();
}


module.exports = templateResponse;