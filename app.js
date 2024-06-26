require('reflect-metadata')
require('dotenv').config()

var bodyParser = require('body-parser')

const swaggerUi = require('swagger-ui-express');
const express = require('express')
const fs = require('fs');
const yaml = require('js-yaml')

const contextInstance = require('./DataAccessLayer/Contexts/movieContextInstance')
const closeConnexionDb = require('./DataAccessLayer/Repositories/Utils/clearSQLiteFile')
const injectDatas = require('./DataAccessLayer/InjectValues')
const moviesRouter = require("./Api/Routes/movieRoutes")
const categoriesRouter = require("./Api/Routes/categorieRoutes")
const swagger = yaml.load(fs.readFileSync('./Api/Documentation/V1/Swagger.yaml'))
const responseTemplate = require('./Api/Middleware/templateResponse')
const logger = require('./Api/Middleware/logger')
const injectContext = require('./Api/Middleware/InjectContext')
const app = express()
const PORT = process.env.PORT || 5000;

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger)
app.use(responseTemplate)
app.use(injectContext)

app.use('/api/v1', moviesRouter);
app.use('/api/v1', categoriesRouter);

app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swagger))

contextInstance.sync()
.then(() => {
  injectDatas.injectCategories(contextInstance)
})
.catch(error => {
  console.error(`Une erreur s'est produite lors de la synchronisation des modèles: ${error}`);
});


process.on('SIGINT', closeConnexionDb.closeConnexion);
process.on('SIGTERM', closeConnexionDb.closeConnexion);

app.listen(PORT, ()=>{
    console.log(`Api lancée sur le port ${process.env.PORT}, pour y accéder: http://localhost:${process.env.PORT}/api/v1/swagger`)
})