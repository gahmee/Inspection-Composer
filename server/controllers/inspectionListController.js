const InspectionList = require('../models/inspectionModel')
const mongoose = require('mongoose')

// GET all list
const getAllLists = async (req, res) => {
    const lists = await InspectionList.find({})
    res.status(200).json(lists)
}

// DELETE a list
const deleteList = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such list' })
    }

    const list = await InspectionList.findOneAndDelete({_id: id})

    if (!list) {
        console.log('test')
        return res.status(404).json({error: 'Cannot find List'})
    }

    res.status(200).json(list)
}


// create a list
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
    deleteList,
    createList
}