class ErrorRepository{
    constructor(message, statuscode, technicalMessage = undefined){
        this.message = message;
        if(technicalMessage == undefined){
            this.technicalMessage = "";
        }else{
            this.technicalMessage = technicalMessage;
        }
        this.statuscode = statuscode;
    }

    toPrototype(){
        return {
            message: this.message,
            statuscode: this.statuscode,
            technicalMessage: this.technicalMessage
        }
    }
}

module.exports = ErrorRepository