const bcrypt = require('bcrypt')
const express = require('express')
const { User } = require('../models/models.user')
const router = express.Router()
const jwt = require('jsonwebtoken')
const {requireAuth} = require('../middleware/authMiddleware')


const maxAge = 3 * 24 * 60 * 60 ;
const createToken = (id) => {
    return jwt.sign({ id },'mysecretkey')
}


router.get('/',async(req,res)=>{
    res.render('login')
})

router.get('/mypage',requireAuth,(req,res) => {
    res.render('mypage')
})

router.post('/',async(req,res)=>{

    let user = await User.findOne({email:req.body.email})

    if(user){

        let validPassword = await bcrypt.compare(req.body.password,user.password)

        if(validPassword){
            const token  = createToken(user._id)
            res.cookie('jwt',token)
            res.redirect('/auth/mypage')
        } 
        
    }
     
})

module.exports = router