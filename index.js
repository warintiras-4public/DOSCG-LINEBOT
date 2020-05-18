const express = require('express');
const line = require('@line/bot-sdk');

const config = {
    channelAccessToken: 'cyNaR/BGrcuuc/AWK9TGrZ0nHbZN2nBOIAbVmn6TsbMIVZQzm+u1swGWFr8UpKVNhF2GIhYWAKI0TQi7CjYYM//R08r2iuPiI/5nkMxWOXf7OG+WaVyIC/1tpJuwz6eemIoQryMErjz42XwGAi/KSQdB04t89/1O/w1cDnyilFU=',
    channelSecret: 'bbaf3fd52698fed2d164975d96c7edc8'
};

const app = express();
// app.post('/linebot/webhook', line.middleware(config), (req, res) => {
app.post('/webhook', line.middleware(config), (req, res) => {

    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
        // testing - to be deleted
        res.sendStatus(200)
});

const client = new line.Client(config);

function handleEvent(event) {
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }
console.log("Testing here!");
    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}

app.listen(3000);
