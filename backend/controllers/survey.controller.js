const db = require('../db')

class SurveyController{
    async createSurvey(req, res){
        const {title} = req.body
        try {
            const newSurvey = await db.query(`INSERT INTO survey (title) values ($1) RETURNING *`, [title]);
            res.json(newSurvey.rows[0]);
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось записать опрос" });
        }
    }
    async getSurvey(req, res){
        try {
            const surveis = await db.query('SELECT * FROM survey')
            res.json(surveis.rows)
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось найти ответы" });
        }
    }
}

module.exports = new SurveyController()