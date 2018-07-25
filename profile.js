const express = require('express')
const router = express.Router.Router()

// middleware that is specific to this router
router.use(function timeLog ( req, res, next) {
    console.log('Time: ', Date.now())
    next()
})

router.get('/', function (req, res) {
    res.send('Hello world')
})

router.get('/about', function (req, res) {
    res.send('About Me')
})

// come back to this !!!!!!!!
//var profile = require('./profile')
// ...
// then define the route that will use your custom router
//app.use('/profile', profile)

module.exports = router