

exports.injectCategories = (context) => {
    context.categories.bulkCreate([
        {name:"Action"},
        {name:"Aventure"},
        {name:"Science Fiction"},
        {name:"Romance"},
        {name:"Drama"},
    ])
}

// exports.injectMovies = (context) => {
//     context.categories.bulkCreate([
//         {name:"Retour vers le futur", description:"Retour vers le futur", date:new Date("1970-04-28")},
//         {name:"La famille Adams", description:"La famille Adams", date:new Date("1980-04-28")},
//         {name:"Scooby-doo", description:"Scooby-doo", date:new Date("1972-04-28")},
//         {name:"American pie", description:"American pie", date:new Date("1975-04-28")},
//         {name:"Scary movie", description:"Scary movie", date:new Date("1990-04-28")},
//     ])
// }