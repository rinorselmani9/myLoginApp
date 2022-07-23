const express = require('express')
const router = express.Router()
const {User} = require('../models/models.user')
const bcrypt = require('bcrypt')


router.post("/",async(req,res)=>{

    let user = await User.findOne({email:req.body.email})

    if(user){
        return res.send(404).send("That user already exists")
    }else{
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        })
        const salt = 10
        user.password = await bcrypt.hash(user.password,salt)

        user.save()
        res.send(user)
    }
})

module.exports = router