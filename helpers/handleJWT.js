const jwt = require('jsonwebtoken')


//CONTRASEÑA SECRETE .ENV
const {JWT_SECRET} = process.env


//@PARAMS USER
//DEVUELVE UN TOKEN

const tokenSing = (user)=>{
    console.log(user)
    const  sing =  jwt.sign({
        _id:user._id,
        role:user.role
    },JWT_SECRET,{
        expiresIn:'2h'
    }
    )
    return sing
}

//VERIFICAR EL TOKEN
//@PARAMS JWTTOKEN
const verifyToken = async(tokenJwt)=>{
    try{
        return jwt.verify(tokenJwt,JWT_SECRET)
    }catch(e){
        return null
    }
}

module.exports = {
    tokenSing,
    verifyToken
}