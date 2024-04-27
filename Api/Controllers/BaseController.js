const HalConverter = require('../Helpers/HalConverter')
const ControllerResponse = require('./ControllerResponse')
class BaseController{
    constructor(serivce){
        this.service = serivce;
        this.serviceResponse = undefined;
        this.config = {
            environment: process.env.ENV
        }
        this.response = new ControllerResponse()
        this.halConverter = new HalConverter()
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

       /**
    * Méthode qui permet de construire l'objet de pagination
    * @param {*} query 
    * @param {*} baseUrl 
    * @param {*} nextPage 
    * @param {*} currentPage 
    * @param {*} previewPage 
    * @param {*} last 
    * @returns un objet pour la pagination
    */
       _buildPaginationObject(query,baseUrl,nextPage,currentPage,previewPage, last){
        
        let paginationObject = {
            next:{},
            prev: {},
            current: {},
            first: {},
            last: {}
        }
        
        query["page"] = nextPage
        paginationObject.next = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        if(previewPage >= 1){
            query["page"] = previewPage
            paginationObject.prev = {
                href: this.buildQueryRequest(baseUrl,query)
            }
        }

        query["page"] = currentPage
        paginationObject.current = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        query["page"] = 1
        paginationObject.first = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        query["page"] = last
        paginationObject.last = {
            href: this.buildQueryRequest(baseUrl,query)
        }

        return paginationObject;
    }
}


module.exports = BaseController