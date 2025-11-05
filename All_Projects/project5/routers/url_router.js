const express = require('express')
const router = express.Router()
const {HandleUrlCreate,HandleGetUrlsandUpdate,HandleGetAllData} = require('../controllers/url_controller')

router.post('/',HandleUrlCreate)
router.get('/',HandleGetAllData)
router.get('/:id',HandleGetUrlsandUpdate)


module.exports  = router