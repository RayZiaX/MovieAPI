var bodyParser = require('body-parser')

const swaggerUi = require('swagger-ui-express');
const express = require('express')
const fs = require('fs');
const yaml = require('js-yaml')

const movieRoutesV1 = require("./Api/Routes/movieRoutes")
const swagger = yaml.load(fs.readFileSync('./Api/Documentation/V1/Swagger.yaml'))
const responseTemplate = require('./Api/Middleware/templateResponse')
const logger = require('./Api/Middleware/logger')

const { MovieContext } = require('./DataAccessLayer/Contexts/MovieContext')

const port = 5000



const app = express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(logger)
app.use(responseTemplate)

app.use('/api/v1', movieRoutesV1);

app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swagger))

app.listen(port, ()=>{
    console.log(`Api lancée sur le port ${port}, pour y accéder: http://localhost:${port}/api/v1/swagger`)
})