const express = require('express')
const app = express()
require('dotenv').config()
const mongoose = require('mongoose')
const inspectionListRoutes = require('./routes/inspectionList')
const path = require('path')

// middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use(express.static(path.join(__dirname, "../client/build")))
app.get("/", (req, res) =>
    res.sendFile(path.join(__dirname, "../client/build/index.html"))
)

// routes
app.use('/api/inspection', inspectionListRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT || 4000, () => {
            console.log('listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })
