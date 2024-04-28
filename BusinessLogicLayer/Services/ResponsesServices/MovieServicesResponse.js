class MovieServicesResponse{

    constructor(){
        this.success = false;
        this.data = undefined;
        this.error = undefined;
    }

    setStatus(success){
        this.success = success;
    }

    setData(data){
        this.data = data
    }

    setError(error){
        this.error = error
    }

    toPrototype(){
        return {
            success: this.success,
            data: this.data,
            error: this.error
        }
    }
}


module.exports = MovieServicesResponse