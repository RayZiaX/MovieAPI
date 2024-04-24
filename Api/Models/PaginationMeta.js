const DefaultMeta = require('./DefaultMeta')

class PaginationMeta extends DefaultMeta{
    constructor(currentPage,totalPages,totalResult){
        super()
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalResult = totalResult;
    }

    toPrototype(){
        return {
            currentPage:this.currentPage,
            totalPages:this.totalPages,
            totalResult:this.totalResult,
            timespan: this.timespan
        }
    }
}

module.exports = PaginationMeta