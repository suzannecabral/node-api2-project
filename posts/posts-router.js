const express = require('express');
const router = express.Router();
const Posts = require('../data/db');
//capital - from model

//----------------------------------
//  ENDPOINTS
//----------------------------------

//[x]
//test===================
router.get('/sillytest', (req,res)=>{
    res.json({message:'string'});
})





//----------------------------------
module.exports = router;