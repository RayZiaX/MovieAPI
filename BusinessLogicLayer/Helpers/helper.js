exports.makePagination = (data) =>{
    let page = Number(data.page);
    let limit = Number(data.limit)
    if(page === undefined || page === 0){
        page = 1
    }

    if(isNaN(limit) || limit === undefined){
        limit = 5
    }
    
    let result = {currentPage: page, offset: 0, limit: 0}
    result.offset = (page - 1) * limit;
    result.limit = limit

    return result
}