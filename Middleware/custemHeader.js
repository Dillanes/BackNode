
const customHeader = (req,res,next)=>{
    try {
        if(req.headers.authorization){
            console.log('Credenciales validadas')
            next()
        }else{
            res.status(400)
            res.json({error:'Credenciales no validas'})
        }
   }catch(error){
    res.status(500)
    res.json({error:'Halgo ocurrio en el en CustomHeader'})
}}

module.exports = customHeader