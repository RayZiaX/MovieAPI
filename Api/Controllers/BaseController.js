class BaseController{
    constructor(serivce){
        this.service = serivce;
        this.serviceResponse = undefined;
        this.config = {
            environment: process.env.ENV
        }
    }

    getBaseURL(req){
        return `${req.protocol}://${req.get('host')}${req.baseUrl}${req.path}`
    }

    buildQueryRequest(baseURL, dict){
        let url = baseURL+"?"
        let index = 0
        for(let key in dict){
            if(url.charAt(url.length - 1 ) === "?" && dict[key] != undefined){
                url = url + `${key}=${dict[key]}`
            }else if(dict[key] != undefined) {
                url = url + `&${key}=${dict[key]}`
            }
            index++
        }
        return url;
    }
}


module.exports = BaseController