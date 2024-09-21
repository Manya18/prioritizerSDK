const Router = require('express')
const router = new Router()
const featureController = require('../controllers/feature.controller')

router.post('/feature', featureController.createFeatures);
router.get('/feature', featureController.getFeatures);

module.exports = router