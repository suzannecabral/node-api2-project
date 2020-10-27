const express = require('express');
const router = express.Router();
const Posts = require('../data/db');
//capital - from model
//endpoints-------------------------------------------
//----------------------------------------------------

// //test that this file is working=====================
// router.get('/sillytest', (req,res)=>{
//     res.json({message:'string'});
// })

// GET all posts =======================================
//   
router.get('/api/posts', (req,res) => {
    Posts.find(req.body)
        .then(data => {
            // throw ("error thing");
            if(data){
                res.status(200).json(data);
            }else{
                res.status(404).json({message:"Posts not found"});
            }  
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});


//----------------------------------------------------
//endpoints-------------------------------------------

module.exports = router;