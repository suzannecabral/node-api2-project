//import
const express = require('express');
const generate = require('shortid').generate;
// const Posts = require('./data/db'); 
const postsRouter = require('./posts/posts-router-old');

//instantiate - startup new server
const server=express();

//configure
server.use(express.json());//this uses the express .json() method
server.use(postsRouter);//this uses the express router we built in posts-router.js


//test endpoint
server.get('/', (req,res)=>{
    res.send(`Lambda test endpoint`);
});


module.exports = server;