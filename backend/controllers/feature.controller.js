const db = require('../db')

class FeatureController{
    async createFeature(req, res){
        const {title, description, survey_id} = req.body
        try {
            const newSurvey = await db.query(`INSERT INTO feature (title, description, survey_id) values ($1, $2, $3) RETURNING *`, [title, description, survey_id]);
            res.json(newSurvey.rows[0]);
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось записать фичу" });
        }
    }
    async getFeatures(req, res){
        try {
            const features = await db.query('SELECT * FROM feature')
            res.json(features.rows)
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось получить фичи" });
        }
    }
    async getFeaturesFromSurveyId(req, res) {
        const id = req.params.id;
        try {
            const features = await db.query('SELECT * FROM feature WHERE survey_id=$1', [id]);
            res.json(features.rows);
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось получить фичи" });
        }
    }
}

module.exports = new FeatureController()