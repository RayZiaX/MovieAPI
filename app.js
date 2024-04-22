const express = require('express')
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const port = 5000
const movieRoutesV1 = require("./Api/Routes/movieRoutes")
const yaml = require('js-yaml')
const swagger = yaml.load(fs.readFileSync('./Api/Documentation/V1/Swagger.yaml'))
const responseTemplate = require('./Api/Middleware/templateResponse')
const logger = require('./Api/Middleware/logger')
const app = express()

app.use(logger)
app.use(responseTemplate)

app.use('/api/v1', movieRoutesV1);


app.use('/api/v1/swagger', swaggerUi.serve, swaggerUi.setup(swagger))

app.listen(port, ()=>{
    console.log(`Api lancée sur le port ${port}, pour y accéder: http://localhost:${port}/api/v1/swagger`)
})