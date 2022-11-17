const express = require('express')
const router = express.Router()
const uploadMiddleware = require('../helpers/handleStorage')
const {getItems,getItem,postItem,putItem,deleteItem} = require('../Controllers/storageControllers.js')


router.route('/')
.post(uploadMiddleware.single('myFile'),postItem)
.get(getItems)
// WIHT ID
router.route('/:id')
.get(getItem)
.delete(deleteItem)
.put(uploadMiddleware.single('myFile'),putItem)


module.exports = router