const Router = require('express')
const router = new Router()
const surveyController = require('../controllers/survey.controller')

router.post('/survey', surveyController.createSurvey);
router.get('/surveis', surveyController.getSurveis);
router.get('/survey/:id', surveyController.getSurvey);

module.exports = router