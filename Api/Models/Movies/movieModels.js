module.exports = class DtoMovie{
    id;
    name;
    description;
    hasReservationsAvailable;
    date

    constructor(data){
        this.name = data.name;
        this.id = data.id;
        this.description = data.description;
        this.hasReservationsAvailable = data.hasReservationsAvailable
        this.date = data.date;
    }
}