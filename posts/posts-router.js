const express = require('express');
const { insertComment, update } = require('../data/db');
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

// [x]
// DELETE post by id ====================================
//to return a whole deleted post:
//nest the remove function inside the .then for a findPostById
// finds post, saves it to a variable, 
// then deletes post
// on success, uses stored variable to print the now-deleted post content.
// I don't think this is what was intended.

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

// [x]
// POST new post ====================================

router.post('/api/posts', (req,res)=>{
    // if statement needs to be outside promise
    //decide whether or not to run posts.insert
    // based on validation if () 

    if( !req.body.contents || !req.body.title ){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }else{
        Posts.insert(req.body)
            .then(data=>{
                // console.log(data);
                // //data is an object { id:24 }
                res.status(201).json({message:`Post ${data.id} was created successfully`});
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            })
    }
});

// [x]
// POST new comment by post id =========================
//to return the whole comment/post/etc: nest a findCommentById in the .then
// I don't think this is what was intended.
router.post('/api/posts/:id/comments', (req,res)=>{

    if( !req.body.text ){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }else{
        const newComment={
            "text":req.body.text,
            "post_id":req.params.id
        }
        insertComment(newComment)
            .then(data=>{
                console.log(data);
                res.status(201).json({ message: `Comment ${data.id} added successfully`})
            })
            .catch(err=>{
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the comment to the database" });
            });
    }

});

// [x]
// PUT req to /api/posts/:id =========================

router.put('/api/posts/:id', (req,res)=>{
    const { id } = req.params
    const { title, contents } = req.body

    // console.log(updatedPost);

    //0. verify user data
    if(!title || !contents){
        //bad request
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }else{
    //1. find post, verify it exists
    Posts.findById(id)
        .then(data=>{


            console.log('Post Data:',data)

            if( data.length > 0 ){ 
                //2. post updated version
                const updatedPost = {
                    id,
                    title,
                    contents
                }
                update(id,updatedPost)
                    .then(data =>{
                        console.log(data);
                        res.status(200).json({message:`Post was updated successfully`});
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({ error: "The post information could not be modified." });
                    })

            }else{ 

                res.status(404).json({ message: "The post with the specified ID does not exist." });

            }

        })
        .catch(err=>{
            //3. doesn't exist
            console.log(err);
            res.status(500).json({ error: "The post information could not be modified." });
        })
    }














});

//----------------------------------
module.exports = router;