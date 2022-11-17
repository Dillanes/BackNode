const { handleError } = require('../helpers/handleError')
const {tracksModel} =  require('../models/index')
const {matchedData} = require('express-validator')

//get track list
const getTracks = async(req,res)=>{
    try{
        const data  = await tracksModel.find({})
        res.json({data})      
    }catch(e){
        handleError(res,"ERROR_GET_ALL_TRACKS",400)
    }

}

//get track item
const getTrack = async(req,res)=>{
    try{
        const {id} = req.params
        if(id.length!==24)throw new Error('ID_NO_VALIDO_TRACKS')
        const data = await tracksModel.findById({_id:id})
        if(!data) throw new Error('REGISTRO_NO_ENCONTRADO_TRACKS')
        res.json({data})
    }catch(e){
        handleError(res,e.message,400)
        // res.json({error:})
    }

        
}

//add item
const postTrack = async(req,res)=>{
    try{
        const body = matchedData(req) 
        console.log(body)
        const data =  new tracksModel(body)
        await data.save()
        res.json({data})
    }catch(e){
        console.log(e)
        handleError(res,"ERROR_CREATE_TRACK",400)
    }
}

//remove an item from the list
const deleteTrack = async(req,res)=>{
    const {id} = req.params
    try{
        if(id.length!==24) throw new Error ('ID_NO_VALIDO_TRACKS')
        const data = await tracksModel.delete({_id:id})
        res.json({data})
    }catch(e){
        handleError(res,e.message==='EID_NO_VALIDO_TRACKS'?e.message:'ERROR_AL_ELIMINAR_UN_TRACK',400)
    }
        
}

//update list item
const updateTrack = async(req,res)=>{
    try {
        const {id} = req.params
        const body = matchedData(req)
        if(id.length!==24) throw new Error ('ID_NO_VALIDO_TRACKS')
        const data = await tracksModel.findByIdAndUpdate({_id:id},body)
        res.json({data})        
    } catch (e) {
        handleError(res,e.message==='ID_NO_VALIDO_TRACKS'?e.message:'ERROR_AL_ELIMINAR_UN_TRACK',400)
        
    }
}


const  tracksControllers = {
    getTracks,
    getTrack,
    postTrack,
    deleteTrack,
    updateTrack
}

module.exports = tracksControllers