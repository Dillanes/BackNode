const express = require('express')
const cors = require('cors')
const app =  express()

// const index = require('./routes/index')
require('dotenv').config()
const conexionBD = require('./DB/conexion')

app.use(cors())
app.use(express.json())
app.use(express.static("storage"))

//INVOCAMOS A LAS RUTAS
app.use('/api/',require('./routes'))


app.listen(process.env.PORT, ()=>console.log(`Corre en el puerto ${process.env.PORT} 🥵🤑`))
conexionBD()