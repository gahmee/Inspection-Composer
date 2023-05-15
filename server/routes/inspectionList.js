const express = require('express')
const router = express.Router()
const {
    getAllLists,
    createList
} = require('../controllers/inspectionListController')

//GET all lists
router.get('/', getAllLists)

//POST new list
router.post('/', createList)

module.exports = router;