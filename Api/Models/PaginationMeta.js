const DefaultMeta = require('./DefaultMeta')

class PaginationMeta extends DefaultMeta{
    constructor(currentPage,totalPages,totalResult,currentResult,previewPage, nextPage){
        super()
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalResult = totalResult;
        this.currentResult = currentResult;
        this.previewPage = previewPage;
        this.nextPage = nextPage;
    }

    toPrototype(){
        return {
            timespan: this.timespan.toISOString(),
            pages: {
                totalPages:this.totalPages,
                currentPage:this.currentPage
            },
            results: {
                totalResult:this.totalResult,
                currentResult:this.currentResult
            },
            links: {
                previewPage: this.previewPage,
                nextPage: this.nextPage
            }
        }
    }
}

module.exports = PaginationMeta