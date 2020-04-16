const express = require('express')
const app = express();
const route = require('./route')
const port = 3000; 


app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use('/', route)

app.listen(port, () => {
    console.log(`listening on port${port}`)
})

