const { handleError } = require("../helpers/handleError")

const checkRol = (rol) => (req,res,next)=>{
    try {
        const {user} = req,
              {role} = user
                console.log(user)
                console.log(role)

        next()
    } catch (error) {
        handleError(res,'ERROR_PERMISSIONS')
    }

}


module.exports = checkRol