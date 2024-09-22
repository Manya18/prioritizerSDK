const Router = require('express')
const router = new Router()
const surveyController = require('../controllers/survey.controller')

router.post('/survey', surveyController.createSurvey);
router.get('/survey', surveyController.getSurvey);

module.exports = router