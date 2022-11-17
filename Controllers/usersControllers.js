const {usersModel} = require('../models/index')
const {matchedData} = require('express-validator')
const { handleError } = require('../helpers/handleError')
const {compare,encrypt} = require('../helpers/handlePassword')
const {tokenSing,verifyToken} = require('../helpers/handleJWT')
const getItems = async(req,res)=>{
    try {
        const data = await usersModel.find({})
        res.json({data})
    } catch (error) {
        handleError(res,"ERROR_GET_USERS",400)
    }
}

const getItem = async(req,res)=>{
    try{
        const {id} = req.params
        if(id.length!== 24) throw new Error('ID_NO_VALIDO_USER')
        const data = await usersModel.findById({_id:id}) 
        res.json({data})
    }catch(e){
        handleError(res,e.message ==='ID_NO_VALIDO_USER'?e.message:"ERROR_GET_USER",400)
    }

}

const userRegister = async(req,res)=>{
    try{
        req = matchedData(req)
        const password = await encrypt(req.password)
        const user = {...req,password}
        const token = tokenSing(user) 
        const data = {
            token,
            user
        }
        const data1 = new usersModel(user)
        await data1.save()
        res.json({user:data,message:'USUARIO_REGISTRADO'})
    }catch(e){
        handleError(res,'ERROR_USER_REGISTER',400)
    }   
}


const userLogin = async(req,res)=>{
    try{
        req = matchedData(req)
        const {email,password} = req
        const user = await usersModel.findOne({email})
        if(!user) {
            handleError(res,'USER_NOT_FOUND',404)
            return
        }
        const result = await compare(password,user.password)
        if(!result){
            handleError(res,'CREDENTIALS_NOT_VALID',401)
            return
        }

        const {_id,name,role} = user 
        const data =  {
            token: tokenSing(user),
            user:{
                email,
                name,
                role,
                _id
        }}
        
        res.json({data,message:'LOGIN_COMPLETE'})
        
    }catch(e){
        handleError()
    }

}

const putItem = async(req,res)=>{
    try {
        const {id} = req.params
        if(id.length!== 24) throw new Error('ID_NO_VALIDO_USER')
        const body = matchedData(req)
        const data = await usersModel.findByIdAndUpdate({_id:id},body)
        res.json({data})
    } catch (e) {
        handleError(res,e.message==='ID_NO_VALIDO_USER'?e.message:"ERROR_EDIT_USER",400)
    }
}

const deleteItem = async(req,res)=>{
    try {
        const {id} = req.params
        if(id.length!== 24) throw new Error('ID_NO_VALIDO_USER')
        const data = await usersModel.delete({_id:id})   
        res.json({data})
    } catch (e) {
        handleError(res,e.message==='ID_NO_VALIDO_USER'?e.message:"ERROR_DELETE_USER",400)
    }
}


const usersControllers = {
    getItems,
    getItem,
    userRegister,
    userLogin,
    putItem,
    deleteItem

}

module.exports = usersControllers