const express = require('express');
const fs =  require('fs');
const router = express.Router();

const PATH_ROUTES = __dirname;

fs.readdirSync(PATH_ROUTES).filter((file) =>{
    const name = file.split('.').shift() // [index] od [tracks] or [users] or [storage]
    if(name !== 'index'){
        router.use(`/${name}`,require(`./${file}`))
    }
})

module.exports = router