const express = require('express')
const router =  express.Router()
const {getTracks,getTrack,postTrack,deleteTrack,updateTrack} = require('../Controllers/tracksControllers')
const { validatorCreateItem } = require('../validators/tracks')
const authMiddleware =  require('../Middleware/session')
const checkRol = require('../Middleware/rol')

// CRUD 
router.route('/')
.get(authMiddleware,checkRol(['admin']),getTracks)
.post(validatorCreateItem,postTrack)

router.route('/:id')
.delete(deleteTrack)
.put(validatorCreateItem,updateTrack)
.get(getTrack)

module.exports = router