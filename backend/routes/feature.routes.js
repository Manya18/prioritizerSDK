const Router = require('express')
const router = new Router()
const featureController = require('../controllers/feature.controller')

router.post('/feature', featureController.createFeature);
router.get('/feature', featureController.getFeatures);
router.get('/feature/:id', featureController.getFeaturesFromSurveyId)

module.exports = router