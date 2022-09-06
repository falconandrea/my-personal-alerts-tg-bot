const express = require('express')

const router = express.Router()

const botController = require('../controllers/bot.controller')

router.get('/', botController.index)

module.exports = router
