const InspectionList = require('../models/inspectionModel')
const mongoose = require('mongoose')

const getAllLists = async (req, res) => {
    const lists = await InspectionList.find({})
    res.status(200).json(lists)
}


const createList = async (req, res) => {
    const {title, list} = req.body

    try {
        const inspectionList = await InspectionList.create({title, list})
        res.status(200).json(inspectionList)
    } catch {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    getAllLists,
    createList
}