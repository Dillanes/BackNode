const mongoose = require('mongoose')

const conexionBD = ()=>{
    mongoose.connect(process.env.URI)
    .then(res=>console.log('Se ha conectado a la base de datos 🤑'))
    .catch(err=>console.log('Error de conexion a la bd 😴'))
}


module.exports = conexionBD
