const MovieContext = require('./MovieContext')
const fs = require("fs")
const SQLite = require('sqlite3')
let dbContextOptions = {
    dialect: process.env.DB_DIALECT,
    logging: process.env.ENV === "DEV" && process.env.DB_LOG === "true"
}

if(process.env.DB_DIALECT.toLocaleLowerCase() === 'postgres'){
    dbContextOptions.host = process.env.DB_HOST
}else if(process.env.DB_DIALECT.toLocaleLowerCase() === 'sqlite'){
    let dirSqlite = './SQL/Sqlite/'
    dbContextOptions.storage = dirSqlite + "MovieAPI.sqlite"
    dbContextOptions.mode = SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX
    // création du dossier pour Sqlite
    if(!fs.existsSync(dirSqlite)){
        fs.mkdirSync(dirSqlite, {recursive: true});
    }
}

const movieContextInstance = new MovieContext(process.env.DB_NAME, process.env.DB_USER,process.env.DB_PASS,dbContextOptions)

module.exports = movieContextInstance