// const express = require('express');
// const linebot = require('./controllers/LINEBOT');

// const app = express();

// app.use('/', linebot);

const express = require('express');
const app = express();
const port = process.env.PORT || 4000;
app.post('/linebot/webhook', (req, res) => res.sendStatus(200));
app.listen(port);