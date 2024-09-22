const db = require('../db')

class ChoiceController{
    async createChoice(req, res){
        const {survey_id, feature_id, positive, negative} = req.body
        try {
            const newChoice = await db.query("INSERT INTO choice (survey_id, feature_id, positive, negative) values ($1, $2, $3, $4) RETURNING *", [survey_id, feature_id, positive, negative]);
            res.json(newChoice.rows[0]);
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось записать ответ" });
        }
    }
    async getChoices(req, res){
        try {
            const choices = await db.query('SELECT * FROM choice')
            res.json(choices.rows)
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось найти ответы" });
        }
    }
    async getChoicesFromSurveyId(req, res){
        const id = req.params.id;
        try {
            const choices = await db.query('SELECT * FROM choice WHERE survey_id=$1', [id]);
            res.json(choices.rows)
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось найти ответы" });
        }
    }
    async getChoicesFromFeatureId(req, res){
        const id = req.params.id;
        try {
            const choices = await db.query('SELECT * FROM choice WHERE feature_id=$1', [id]);
            res.json(choices.rows)
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось найти ответы" });
        }
    }
}

module.exports = new ChoiceController()