const {validationResult} = require('express-validator')

const validationResults = (req,res,next)=>{
    try {
        validationResult(req).throw();
        return next()
    } catch (e) {
        res.status(403);
        res.send({errors: e.array()})
        
    }
}


module.exports = validationResults