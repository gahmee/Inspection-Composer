const express = require('express')
const router = express.Router()
const {
    getAllLists,
    deleteList,
    createList
} = require('../controllers/inspectionListController')

//GET all lists
router.get('/', getAllLists)

//POST new list
router.post('/', createList)

//DELETE a list
router.delete('/:id', deleteList)

module.exports = router;