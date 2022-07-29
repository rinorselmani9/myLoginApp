const bcrypt = require('bcrypt')
const express = require('express')
const { User } = require('../models/models.user')
const router = express.Router()


router.get('/',async(req,res)=>{

    let user = await User.findOne({email:req.query.email})
    console.log(user);
    res.render('index') 
})

module.exports = router