const express = require('express')
const router = express.Router()
const { User } = require('../models/models.user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { requireAuth } = require('../middleware/authMiddleware')

const maxAge = 3 * 24 * 60 * 60 ;
const createToken = (id) => {
    return jwt.sign({ id },'mysecretkey')
}



router.get("/",(req,res)=>{
    res.render('index')
})

router.get('/mypage', requireAuth,(req,res) => {
    res.render('mypage')
})

router.post("/",async(req,res)=>{
    
    let user = await User.findOne({email:req.body.email})

    if(user){
        return res.status(404).send("That user already exists")
    }else{

        user = new User({

            name: req.body.name,
            email: req.body.email,
            password: req.body.password

        })
        const salt = 10
        user.password = await bcrypt.hash(user.password,salt)

        await user.save()
        
        const token = createToken(user._id)
        res.cookie('jwt',token)
        res.redirect('/auth/mypage')
    } 
})

module.exports = router