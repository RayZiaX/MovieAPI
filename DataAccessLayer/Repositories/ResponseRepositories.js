class ResponseRepositories{
    constructor(){
        this.success = false;
        this.entity = undefined;
        this.error = undefined;
    }

    setEntity(entity){
        this.entity = entity
    }

    setState(success){
        this.success = success
    }

    setError(error){
        this.error = error
    }

    toPrototype(){
        return {
            success: this.success,
            entity: this.entity,
            error: this.error
        }
    }
}

module.exports = ResponseRepositories