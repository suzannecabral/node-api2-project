const express = require('express');
const router = express.Router();

//endpoints-------------------------------------------
//----------------------------------------------------

router.get('/sillytest', (req,res)=>{
    res.json({message:'another string'});
})

router.get('/api/posts', (req,res) => {
    res.json(req.query);
});


//----------------------------------------------------
//endpoints-------------------------------------------

module.exports = router;