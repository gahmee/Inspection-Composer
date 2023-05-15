const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const inspectionListRoutes = require('./routes/inspectionList')

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/inspection/', inspectionListRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('listening on port 4000')
        })
    })
    .catch((error)=> {
        console.log(error)
    })
