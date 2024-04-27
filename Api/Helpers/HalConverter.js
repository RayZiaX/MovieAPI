class HalConverter{
    constructor() {
        
    }

    paginationHalMovies(req, movies, paginationObject){
        let copy = Object.assign([], movies)
        let halMovies = this._paginationHalObject(paginationObject)
        let arrMovies = []
        
        copy.map(movie => {
            let prototype = this._buildHalObject(req,movie,"movie",movie.idMovie, true)
            arrMovies.push(prototype)
        })
        halMovies.movies = arrMovies
        return halMovies
    }

    _buildHalObject(req, obj,name, value, recursive = false){
        let prototype = this._buildLinksHalObject(req,name, value)
        for(let key of Object.keys(obj)){
            let value = obj[key]
            if(!Array.isArray(value)){
                prototype[key] = value
            }else if (Array.isArray(value) && recursive){
                prototype[key] = []
                value.forEach(x => {
                    for(let k in x){
                        if(k.startsWith("id")){
                            prototype[key].push(this._buildHalObject(req,x,key.slice(0,-1),x[k]))
                        }
                    }
                });
            }
        }
        return prototype
    }

    _paginationHalObject(paginationObject){
        if(paginationObject != undefined){
            let obj = this._linksHalObject(paginationObject.current.href)
            if(paginationObject.next != undefined && paginationObject.next.href != undefined){
                obj._links.next = {
                    href: paginationObject.next.href
                }
            }

            if(paginationObject.prev != undefined && paginationObject.prev.href != undefined){
                obj._links.prev = {
                    href: paginationObject.prev.href
                }
            }
            if(paginationObject.first != undefined && paginationObject.first.href != undefined){
                obj._links.first = {
                    href: paginationObject.first.href
                }
            }
            if(paginationObject.last != undefined && paginationObject.last.href != undefined){
                obj._links.last = {
                    href: paginationObject.last.href
                }
            }
            return obj
        }else{
            return undefined
        }
    }

    _linksHalObject(href){
        return {
            _links:{
                self:{
                    href: href
                },
            },
        }
    }

    _buildLinksHalObject(req, name, value){
        return {
            _links:{
                self:{
                    href: `${req.protocol}://${req.get('host')}${req.baseUrl}/${name}/${value}`
                },
            },
        }
    }
}


module.exports = HalConverter