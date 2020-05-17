// const express = require('express');
// const linebot = require('./controllers/LINEBOT');

// const app = express();

// app.use('/', linebot);

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
const port = process.env.PORT || 4000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.post('/linebot/webhook', (req, res) => {
    let reply_token = req.body.events[0].replyToken;
    reply_token(reply_token);
    res.sendStatus(200)
});

app.listen(port);

function reply(reply_token) {
    let headers = {
        'Content-Type' : 'application/json',
        'Authorization' : 'Bearer {cyNaR/BGrcuuc/AWK9TGrZ0nHbZN2nBOIAbVmn6TsbMIVZQzm+u1swGWFr8UpKVNhF2GIhYWAKI0TQi7CjYYM//R08r2iuPiI/5nkMxWOXf7OG+WaVyIC/1tpJuwz6eemIoQryMErjz42XwGAi/KSQdB04t89/1O/w1cDnyilFU=}'
    };

    let body = JSON.stringify({
        replyToken : reply_token,
        messages : [{
            type : 'text',
            text : 'Hello'
        },
        {
            type : 'text',
            text : 'How are you?'
        }]
    });

    request.post({
        url : 'https://api.line.me/v2/bot/message/reply',
        headers : headers,
        body : body
    }, (err, res, body) => {
        console.log('status = '+res.statusCode);
    });
}