const DefaultMeta = require('./DefaultMeta')

class PaginationMeta extends DefaultMeta{
    constructor(currentPage,totalPages,totalResult,previewPage, nextPage){
        super()
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalResult = totalResult;
        this.previewPage = previewPage;
        this.nextPage = nextPage;
    }

    toPrototype(){
        return {
            currentPage:this.currentPage,
            totalPages:this.totalPages,
            totalResult:this.totalResult,
            timespan: this.timespan.toISOString(),
            previewPage: this.previewPage,
            nextPage: this.nextPage
        }
    }
}

module.exports = PaginationMeta