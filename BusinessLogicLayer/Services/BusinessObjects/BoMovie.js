class BoMovie{
    constructor({id,name,description,date}){
        this.id = id
        this.name = name
        this.description = description
        this.date = date
    }

    /**
     * Méthode qui permet de vérifier les données du film
     * @param {un objet optionel qui permet de configurer la vérification des données du film} param0 
     * @returns un objet contenant l'état de la vérification et eventiellement un objet erreur
     */
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

    /**
     * Méthode qui permet de retourner sous forme de prototype les données de l'objet métier
     * @returns un prototype avec les données de l'objet métier
     */
    toPrototype(){
        return{
            id: this.id,
            name: this.name,
            description: this.description,
            date: this.date
        }
    }

    /**
     * Méthode qui permet de vérifier si la date saisie par l'utilisateur est bien une date
     * @param {la date en string} dateString 
     * @returns vrai si c'est une date et false si ce n'est pas une date
     */
    _isValidDate(dateString) {
        const date = new Date(dateString);
        return !isNaN(date.getTime());
      }
}

module.exports = BoMovie