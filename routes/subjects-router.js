const router = require('express').Router()

router.get('/', (req, res) => {
    res.send('<h1>Halaman Subjects List</h1>')
})
module.exports = router