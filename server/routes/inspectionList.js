const express = require('express')
const router = express.Router()
const {
    getAllLists,
    deleteList,
    updateList,
    createList
} = require('../controllers/inspectionListController')

//GET all lists
router.get('/', getAllLists)

//POST new list
router.post('/', createList)

//UPDATE a list
router.patch('/:id', updateList)

//DELETE a list
router.delete('/:id', deleteList)

module.exports = router;