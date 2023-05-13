const express = require('express')
const app = express()
const dotenv = require('dotenv')

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'welcome'})
})

app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port 4000')
})