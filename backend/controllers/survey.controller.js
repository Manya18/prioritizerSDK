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
    async getSurveis(req, res){
        try {
            const surveis = await db.query('SELECT * FROM survey')
            res.json(surveis.rows)
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось найти опросы" });
        }
    }
    async getSurvey(req, res){
        const id = req.params.id;
        try {
            const surveis = await db.query('SELECT (title) FROM survey WHERE id=$1', [id]);
            res.json(surveis.rows[0]);
        }
        catch(e) {
            return res.status(400).json({ message: "Не удалось найти опрос" });
        }
    }
}

module.exports = new SurveyController()