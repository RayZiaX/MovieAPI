const MovieServicesResponse = require("./ResponsesServices/MovieServicesResponse")

class BaseService {
    constructor(){
        this.response = new MovieServicesResponse();
    }
}


module.exports = BaseService