const {Builder} = require('xml2js')

/**
 * Fonction qui permet d'envoyer un réponse au client
 * @param {la requête} req 
 * @param {l'objet réponse de express js} res 
 * @param {l'objet qui constitu la réponse envoyé au client} param2 
 */
function sendResponse(req,res, {data = {}, error = {}, meta = { timespan: new Date().toISOString()}, statusCode = 400, technicalError = undefined}){
    const responseObject = {
        data: data.data || {},
        halData: data.halData || {},
        error: error || {},
        meta: meta
    }

    if((responseObject.error.technicalMessage != undefined || responseObject.error.technicalMessage !== '') && process.env.ENV == "DEV"){
        responseObject.error.technicalMessage = technicalError
    }else{
        delete responseObject.error.technicalMessage
    }


    if(req.accepts('*/*')){
        responseObject.halData = undefined
        res.status(statusCode).json(responseObject)
    }else if(req.accepts("application/hal+json")){
        responseObject.data = responseObject.halData
        responseObject.halData = undefined
        res.status(statusCode).json(responseObject)
    }else if(req.accepts('application/xml')){
        delete responseObject.halData
        const xml = new Builder().buildObject(responseObject)
        res.status(statusCode)
        res.set('Content-Type', 'application/xml')
        res.send(xml)
    }else if(req.accepts('application/json')){
        responseObject.halData = undefined
        res.status(statusCode).json(responseObject)
    }else{
        res.status(406).set('Content-Type', 'text/plain').send("type not reconized")
    }
}

/**
 * Middleware qui permet d'injecter 2 fonction dans l'objet res l'envoie de réponse au client
 * @param {la requête} req 
 * @param {l'objet réponse de express js} res 
 * @param {le callback} next 
 */
function templateResponse (req,res,next){
    res.sendData = (data,statusCode = 200, meta = { timespan: new Date().toISOString()}) => {
        sendResponse(req,res, {data: data, statusCode: statusCode, meta: meta})
    };

    res.sendError = (error, statusCode = 400, meta = { timespan: new Date().toISOString()}) => {
        if(error.error == undefined){
            sendResponse(req,res, {error: error, statusCode: statusCode, meta: meta})
        }else{
            sendResponse(req,res, {error: error.error, statusCode: statusCode, meta: meta})
        }
    };
    next();
}


module.exports = templateResponse;