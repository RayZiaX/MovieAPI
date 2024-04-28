

exports.injectCategories = (context) => {
    context.categories.bulkCreate([
        {name:"Action"},
        {name:"Aventure"},
        {name:"Science Fiction"},
        {name:"Romance"},
        {name:"Drama"},
    ])
}