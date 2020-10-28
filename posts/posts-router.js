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

// [x]
// GET all posts =====================================

router.get('/api/posts', (req,res) => {
    Posts.find(req.body)
        .then(data => {
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

// [x]
// GET post by id ====================================

router.get('/api/posts/:id', (req,res)=>{   
    
    Posts.findById(req.params.id)
    .then(data => {
            if(data[0].id != req.params.id){
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }else{
                res.status(200).json(data);
            }
        })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

// [x]
// GET comments by post id ====================================

router.get('/api/posts/:id/comments', (req,res)=>{
    Posts.findPostComments(req.params.id)
        .then(
            data=>
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
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
});

// [ ]
// DELETE post by id ====================================

//FIX: this is deleting and also returning the 404 message
//does not seem to return the 200 status

//next step: checkout lec example
//next next step: Q&A wed morning

//non-destructive error tree first?
//can I do Posts.find inside a router.delete function?

router.delete('/api/posts/:id', (req,res)=>{
    Posts.remove(req.params.id)
        .then(data=>{
            //console log the data in .then first
            //before writing logic
            console.log(data);
            if(/*data.id === Number(req.params.id*/ data > 0){
                res.status(200).json({ message: "The post has been deleted"});
            }else{
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({ error: "The post could not be removed" });
        })
});

// [ ]
// POST new post ====================================

// >> not returning 400 correctly, skips to 500

// does return the newly created id, but not full post
// does create new post in db
// does return error info from sqlite on 500 fail

router.post('/api/posts', (req,res)=>{
    // if statement needs to be outside promise
    //decide whether or not to run posts.insert
    // based on validation if () 
    
    Posts.insert(req.body)
        .then(data=>{
            console.log(data);
            //data is an object { id:24 }

            if( !req.body.contents || !req.body.title){
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            }else{
                res.status(201).json({message:"Created successfully", data:data});
            }

            // if(!("contents" in req.body) || !("title" in req.body)){
            //     res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
            // }else{
            //     res.status(201).json({message:"Created successfully", data:data});
            // }
        })

        // try1----------------------------------
        // .then(data=>{
        //     if(!req.body.contents || !req.body.title){
        //         req.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        //     }else{
        //         req.status(201).json(data)
        //     }
        // })

        .catch(err=>{
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
});


//----------------------------------
module.exports = router;