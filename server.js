//import
const express = require('express');
const generate = require('shortid').generate;
// const Posts = require('./data/db'); 
const postsRouter = require('./posts/posts-router');

//instantiate - startup new server
const server=express();

//configure
server.use(express.json());
server.use(postsRouter);


//test endpoint
server.get('/', (req,res)=>{
    res.send(`Lambda test endpoint`);
});


module.exports = server;