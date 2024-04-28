class ErrorResponseServices{
    constructor(errorMessage, statusCode){
        this.errorMessage = errorMessage
        this.statusCode = statusCode
    }
    toPrototype(){
        return{
            message: this.errorMessage,
            statusCode: this.statusCode
        }
    }
}

module.exports = ErrorResponseServices