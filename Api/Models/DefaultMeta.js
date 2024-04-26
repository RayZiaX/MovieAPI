class DefaultMeta{
    constructor(){
        this.timespan = new Date()
    }

    toPrototype(){
        return {
            timespan: this.timespan.toISOString()
        }
    }
}

module.exports = DefaultMeta