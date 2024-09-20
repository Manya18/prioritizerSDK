const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let votes = {}; // голоса

app.post('/api/vote', (req, res) => {
  const { featureId } = req.body;
  if (!votes[featureId]) {
    votes[featureId] = 0; 
  }
  votes[featureId]++;
  res.status(200).json({ message: 'Vote counted!', votes });
});

app.get('/api/votes', (req, res) => {
  res.status(200).json(votes); // текущие голоса
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
