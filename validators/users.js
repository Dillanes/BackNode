const {check} = require('express-validator')
const validationResults = require('../helpers/handleValidator')

const validatorCreateUser = [
    check('name').exists().trim().notEmpty(),
    check('age').exists().trim().notEmpty().isInt(),
    check('email').exists().trim().notEmpty().isEmail(),
    check('password').exists().trim().notEmpty(),
    (req,res,next) => validationResults(req,res,next)
]

const validatorLogin = [
    check('email').exists().trim().notEmpty().isEmail(),
    check('password').exists().trim().notEmpty(),
    (req,res,next) => validationResults(req,res,next)
]


module.exports = {validatorCreateUser,validatorLogin}