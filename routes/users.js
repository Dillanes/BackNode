const express = require('express')
const router = express.Router()
const {matchedData} = require('express-validator')
const {getItems,userRegister,userLogin} = require('../Controllers/usersControllers')
const { validatorCreateUser,validatorLogin} = require('../validators/users')
const customHeader = require('../Middleware/custemHeader')

router.route('/register')
.post(validatorCreateUser,userRegister)
.get(getItems)

router.route('/login')
.post(validatorLogin,userLogin)

// router.route('/login/:id')
// .get(getItem)
// .put(validatorCreateUser,putItem)
// .delete(deleteItem)

module.exports = router