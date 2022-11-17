const handleError = (res,message="Ocurrio un error",code=400)=>{
    res.status(code)
    res.json({error:message})
}

module.exports = {handleError}