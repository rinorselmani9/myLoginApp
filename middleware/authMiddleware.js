const jwt = require('jsonwebtoken')
const { User } = require('../models/models.user')

const requireAuth = (req,res,next) => {
    const token = req.cookies.jwt

    if(token){
        jwt.verify(token,'mysecretkey',async(err,decodedToken) => {
            if(err){
                res.redirect('/auth/mypage')
            }else{
                let user = await User.findById(decodedToken.id)
                res.locals.user = user
                next()
            }
        })
    }else{
        res.redirect('/auth')
    }
}

module.exports = { requireAuth }