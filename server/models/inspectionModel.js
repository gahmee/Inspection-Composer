const mongoose = require('mongoose')

let inspectionListSchema = new mongoose.Schema({
    title: { type: String, required: true },
    list: []
})

const InspectionList = mongoose.model('InspectionList', inspectionListSchema)

module.exports = InspectionList
