const { handleError } = require("../helpers/handleError")
const { verifyToken } = require("../helpers/handleJWT")
const { usersModel } = require("../models")

const authMiddleware = async(req,res,next)=>{
try {
    // console.log(object)
    if(!req.headers.authorization){
        handleError(res,'NEED_Authorization_HEADER',401) 
        return 
    }
    
    const {authorization} = req.headers // TOKEN: bearer nnnnnnnnnnnn
    const token = authorization.split(' ').pop() // TOKEN: nnnnnnnnnnnn
    const dataToken = await verifyToken(token)
   
    if(!dataToken._id) {
        handleError(res,'TOKEN_NOT_VERIFY',401)
        return 
    }
    
    const user = await usersModel.findById({_id:dataToken._id})
    req.user = user
    
    next()
} catch (e) {
    handleError(res,'NO_SESSION',401)
}
}


module.exports = authMiddleware