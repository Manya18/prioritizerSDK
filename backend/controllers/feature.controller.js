const db = require('../db')

class FeatureController{
    async createFeatures(req, res){
        const {title} = req.body
        const newFeature = await db.query("INSERT INTO feature (title) values ($1) RETURNING *", [title]);
        res.json(newFeature.rows[0]);
    }
    async getFeatures(req, res){
        const features = await db.query('SELECT * FROM feature')
        res.json(features.rows)
    }
}

module.exports = new FeatureController()