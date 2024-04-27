class ControllerResponse{
    constructor(){
        this.data = undefined
        this.halData = undefined
        this.error = undefined
        this.meta = undefined
    }

    setData(data){
        this.data = data
    }
    setHalData(halData){
        this.halData = halData
    }
    setError(error){
        this.error = error
    }
    setMeta(meta){
        this.meta = meta
    }

    getData(data){
        return this.data
    }
    getHalData(halData){
        return this.halData
    }
    getError(error){
        return this.error
    }
    getMeta(meta){
        return this.meta
    }

    toPrototype(){
        return {
            data: this.data,
            halData: this.halData,
            error: this.error,
            meta: this.meta
        }
    }
}

module.exports = ControllerResponse