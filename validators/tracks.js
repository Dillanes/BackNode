const {check} =  require('express-validator')
const validationResults = require('../helpers/handleValidator')
const validatorCreateItem = [
    check('name').exists().trim().notEmpty(),
    check('album').exists().trim().notEmpty(),
    check('cover').exists().trim().notEmpty(),
    check('artist').exists().notEmpty(),
    check('artist.name').exists().notEmpty(),
    check('artist.nickname').exists().notEmpty(),
    check('artist.nationality').exists().notEmpty(),
    check('duration').exists().notEmpty(),
    check('duration.start').exists().notEmpty(),
    check('duration.end').exists().notEmpty(),
    check('mediaId').exists().notEmpty(),
    //VALIDACION  middleware
    (req,res,next)=>validationResults(req,res,next)
]


module.exports = {
    validatorCreateItem,
    
}