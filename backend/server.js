const express = require('express');
const cors = require('cors');
const featureRouter = require('./routes/features.routes')
const choiceRouter = require('./routes/choice.routes')

const PORT = process.env.PORT || 8080

const app = express();
app.use(cors());
app.use(express.json())
app.use('/api', featureRouter)
app.use('/api', choiceRouter)

app.listen(PORT, () => {
  console.log(`Server is running on post ${PORT}`);
});

