const express = require('express')
const mongoose = require('mongoose')
const app = express()
const users = require('./routes/router.users')
const auth = require('./routes/router.auth')

app.use(express.json())
app.use('/users',users)
app.use('/auth',auth)

app.set('views','views')
app.set('view engine','ejs')


mongoose.connect("mongodb://127.0.0.1:27017/login_DB")
    .then(()=>console.log("Connected to DB"))
    .catch(()=>console.log("Something went wrong"))

app.listen(5000,()=>{
    console.log("Server is up and running");
})