const Router = require('express')
const router = new Router()
const choiceController = require('../controllers/choice.controller')

router.post('/choice', choiceController.createChoice);
router.get('/choice', choiceController.getChoices);
router.get('/choices_survey/:id', choiceController.getChoicesFromSurveyId);
router.get('/choices_feature/:id', choiceController.getChoicesFromFeatureId);

module.exports = router