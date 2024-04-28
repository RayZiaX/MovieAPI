class ControllerResponse{
    constructor(){
        this.data = undefined
        this.halData = undefined
        this.error = undefined
        this.meta = undefined
    }

    setData(data){
        this.data = data
        this.error = undefined
    }
    setHalData(halData){
        this.halData = halData
    }
    setError(error){
        this.error = error
        this.data = undefined
        this.halData = undefined
    }
    setMeta(meta){
        this.meta = meta
    }

    getData(){
        return this.data
    }
    getHalData(){
        return this.halData
    }
    getError(){
        return this.error
    }
    getMeta(){
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