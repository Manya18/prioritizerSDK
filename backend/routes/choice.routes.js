const Router = require('express')
const router = new Router()
const choiceController = require('../controllers/choice.controller')

router.post('/choice', choiceController.createChoice);
router.get('/choice', choiceController.getChoices);

module.exports = router