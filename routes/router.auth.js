const bcrypt = require('bcrypt')
const express = require('express')
const {User} = require('../models/models.user')
const router = express.Router()




router.get('/',async(req,res)=>{
    res.render('index')  
})

router.post('/',async(req,res)=>{
    let user = await User.findOne({email:req.body.email})

    if(!user){
        res.json({message:"Incorrect email or password"})
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword){
        res.json({message:"Incorrect email or password"})
    }
    console.log("TRUE")
})

module.exports = router