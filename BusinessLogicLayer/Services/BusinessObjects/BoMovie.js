class BoMovie{
    constructor({id,name,description,date}){
        this.id = id
        this.name = name
        this.description = description
        this.date = date
    }

    checkData({ignoreId=false}){
        let result = {
            ok: true,
            error: {
                errorMessage: "",
                errorIndicator: []
            }
        }
        
        if(!ignoreId && (this.id == undefined || isNaN(this.id))){
            result.ok = false
            result.error.errorIndicator.push("identifiant non valide")
        }

        if(this.name == undefined || this.name === ""){
            result.ok = false
            result.error.errorIndicator.push("nom non valide")
        }

        if(this.description == undefined || this.description === ""){
            result.ok = false
            result.error.errorIndicator.push("description non valide")
        }

        if(this.date == undefined){
            result.ok = false
            result.error.errorIndicator.push("date vide")
        }

        if(!this._isValidDate(this.date)){
            result.ok = false
            result.error.errorIndicator.push("date non valide")
        }

        if(result.error.errorIndicator.length > 0){
            result.ok = false
            result.error.errorMessage = "des données pour un film sont non conforme"
        }

        return result;
    }

    toPrototype(){
        return{
            id: this.id,
            name: this.name,
            description: this.description,
            date: this.date
        }
    }

    _isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      }
}

module.exports = BoMovie