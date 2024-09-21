const db = require('../db')

class ChoiceController{
    async createChoice(req, res){
        const {priority, feature_id, is_positive} = req.body
        const newChoice = await db.query("INSERT INTO choice (priority, feature_id, is_positive) values ($1, $2, $3) RETURNING *", [priority, feature_id, is_positive]);
        res.json(newChoice.rows[0]);
    }
    async getChoices(req, res){
        const choices = await db.query('SELECT * FROM choice')
        res.json(choices.rows)
    }
}

module.exports = new ChoiceController()