class HalConverter{
    constructor() {
        
    }


    buildSingleHalObject(req,object,name){
        if(object != undefined){
            let idObject = this._foundId(object)
            let halObject = this._buildHalObject(req,object,name,idObject,true,true)
            return halObject
        }else{
            return undefined
        }
    }

    paginationHalCategories(req, categories, paginationObject){
        let copy = Object.assign({},categories)
        let halCategories = this._paginationHalObject(paginationObject)
        let arrayMovies = []
        let halCategorie = this._buildHalObject(req,copy, "categorie", copy.idCategorie,false,false)
        copy.movies.map(movie => {
            let prototype = this._buildHalObject(req,movie, "movie", movie.idMovie,true,false)
            arrayMovies.push(prototype)
        })

        halCategories = this._mergeMainObject(halCategories, halCategorie)
        halCategories.movies = arrayMovies

        return halCategories
    }

    paginationHalMovies(req, movies, paginationObject){
        let copy = Object.assign([], movies)
        let halMovies = this._paginationHalObject(paginationObject)
        let arrMovies = []
        
        copy.map(movie => {
            let prototype = this._buildHalObject(req,movie,"movie",movie.idMovie, true,true)
            arrMovies.push(prototype)
        })
        halMovies.movies = arrMovies
        return halMovies
    }

    /**
     * Méthode qui permet de réaliser une conversion d'objet en objet au format HAL
     * @param {la requête contenant les information pour réaliser les liens} req 
     * @param {l'objet à transformer en hal object} obj 
     * @param {le nom de la section} name 
     * @param {valeur a ajouter dans le lien} value 
     * @param {permet d'activer ou non la récursivité} recursive 
     * @returns {un objet transformé en objet HAL}
     */
    _buildHalObject(req, obj,name, value, recursive = false,allRecursive = false){
        let prototype = this._buildLinksHalObject(req,name, value)
        for(let key of Object.keys(obj)){
            let value = obj[key]
            if(!Array.isArray(value)){
                prototype[key] = value
            }else if (Array.isArray(value) && (recursive || allRecursive)){
                prototype[key] = []
                value.forEach(x => {
                    for(let k in x){
                        if(k.startsWith("id")){
                            prototype[key].push(this._buildHalObject(req,x,key.slice(0,-1),x[k],false,allRecursive))
                        }
                    }
                });
            }
        }
        return prototype
    }

    _mergeMainObject(halObject,object){
        for(let key in Object.keys(object)){
            halObject[key] = object[key]
        }
        return halObject
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

    _foundId(object){
        for(let key of Object.keys(object)){
            if(key.startsWith('id')){
                return object[key]
            }
        }
        return undefined
    }
}


module.exports = HalConverter