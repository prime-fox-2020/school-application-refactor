const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set(express.urlencoded({extended : true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', router)

app.listen(port, () =>{
    console.log('This app is listening on port ', port)
})