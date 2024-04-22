module.exports = class DtoMovie{
    id;
    name;
    description;
    date

    constructor(data){
        this.name = data.name;
        this.id = data.id;
        this.description = data.description;
        this.date = data.date;
    }
}