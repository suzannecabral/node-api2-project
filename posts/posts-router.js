const express = require('express');
const router = express.Router();
const Posts = require('../data/db');
//capital - from model

//----------------------------------
//  ENDPOINTS
//----------------------------------

// //test===================
// router.get('/sillytest', (req,res)=>{
//     res.json({message:'string'});
// })


// GET all posts =====================================

router.get('/api/posts', (req,res) => {
    Posts.find(req.body)
        .then(data => {
            // throw ("error thing");
            if(!data){
                res.status(404).json({message:"Posts not found"});
            }else{
                res.status(200).json(data);
            }  
            
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});

// GET post by id ====================================
   
router.get('/api/posts/:id', (req,res)=>{   
    
    Posts.findById(req.params.id)
    .then(data => {
            // throw("ERRRROOOOOORRR");
            if(data[0].id != req.params.id){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }else{
                res.status(200).json(data);
            }
        })
    .catch(err => {
        console.log(err);
        console.log(err.message, err.stack);
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});


// GET comments by post id ====================================

router.get('/api/posts/:id/comments', (req,res)=>{
    Posts.findPostComments(req.params.id)
        .then(
            data=>
            // res.status(200).json(data.length)
            {
                if(data.length === 0){
                    res.status(404).json({ message: "The post with the specified ID does not exist or has no comments." })
                }else if( data[0].post_id === Number(req.params.id) ){
                    res.status(200).json(data)
                }else{
                    res.status(404).json({ message: "fix this" })
                }
            }
        )
        .catch(err => {
            console.log(err);
            console.log(err.message, err.stack);
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
});



//----------------------------------
module.exports = router;