
function templateResponse (req,res,next){
    res.sendData = (data, meta = {}) => {
        res.json({
            data: data,
            error: {},
            meta: meta
        })
    };

    res.sendError = (error, statusCode = 400, meta = {}) => {
        res.status(statusCode).json({
            data: {},
            error: error,
            meta: meta
        })
    };

    next();
}


module.exports = templateResponse;