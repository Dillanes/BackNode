const { handleError } = require('../helpers/handleError')
const {storageModel} = require('../models/index')
const fs = require('fs')
const {PUBLIC_URL} = process.env
const MEDIA_PATH = `${__dirname}/../storage`


const getItems = async(req,res)=>{
    try {
        const data = await storageModel.find({})
        res.status(200)
        res.json({data})  
    } catch (e) {
        handleError(res,'ERROR_GET_ALL_STORAGE',400)
    }

}

const getItem = async(req,res)=>{
    const idLength = req.params.id.length 
    try {  
        if (idLength !== 24)  throw new Error('ID_NO_VALIDO_STORAGE')
        const data = await storageModel.findById({_id:req.params.id})  
        if(!data) throw new Error('REGISTER_NOT_FOUND_STORAGE')
        res.status(200)     
        res.json({data})
    } catch (e) {
        handleError(res,e.message,400)
    }
}

const postItem = (req,res)=>{
    const {file} = req
    try {
    const fileData = {
        filename: file.filename,
        url: `${PUBLIC_URL}/${file.filename}`
    }
        const data = new storageModel({filename:fileData.filename,url:fileData.url})
        data.save()
        res.status(201)
        res.json({data})
    } catch (e) {
       handleError(res,'ERROR_CREATE_STORAGE',400)
    }
}

const putItem = async(req,res)=>{
    try {
        const {id} = req.params
        const {file} = req
        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }
        if(id.length!==24) throw new Error('ID_NO_VALIDO_STORAGE')
        const currentFile = await storageModel.findById({_id:id})
        const link = `${MEDIA_PATH}/${currentFile.filename}`
        fs.unlinkSync(link)
        const data = await storageModel.findByIdAndUpdate({_id:id},{fileData})
        res.status(200)
        res.json({data})
    } catch (e) {
        handleError(res,e.message==='ID_NO_VALIDO_STORAGE'?e.message:"ERROR_EDID_STORAGE")
    }
}

const deleteItem = async(req,res)=>{
    try {
        const {id} = req.params
        if(id.length!==24) throw new Error('ID_NO_VALIDO')
        const file = await storageModel.findById({_id:id})
        const data = await storageModel.deleteOne({_id:id}) 
        const link = `${MEDIA_PATH}/${file.filename}`
        console.log(link,file)
        fs.unlinkSync(link) 
        res.status(200) 
        res.json({message:'Se elimino el Archivo',data})    
    } catch (e) {
        handleError(res,e.message === 'ID_NO_VALIDO'? e.message:'ERROR_DELETE_STORAGE')
    }
}


const storageControllers = {
    getItems,
    getItem,
    postItem,
    putItem,
    deleteItem

}


module.exports = storageControllers;