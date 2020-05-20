const express = require('express');
const request = require('request');
const line = require('@line/bot-sdk');

require('dotenv').config();

const config = {
    channelAccessToken: process.env.channelAccessToken,
    channelSecret: process.env.channelSecret
};

const app = express();
app.post('/linebot/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});

const client = new line.Client(config);

function handleEvent(event) {
    // Need to compare times, notification will be sent if incoming message has been received for more than 10 seconds
    // First, get the current time
    let currentDate = new Date();
    let currentTime = currentDate.getTime();

    // Compare times and send notification if needed
    if ((currentTime - event.timestamp) > 10) {
        // Send notification if the message has been received for more than 10 seconds
        let token = 'xxxxxx'; // Need to get this from Line Notify
        let message = 'Somebody has messaged you! Please check DOSCG!';
        
        request({
            method: 'POST',
            uri: 'https://notify-api.line.me/api/notify',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            auth: {
                'bearer': token
            },
            form: {
                message: message
            }
        }, (err, httpResponse, body) => {
            if (err) {
                console.log(err);
            } else {
                res.json({
                    httpResponse: httpResponse,
                    body: body
                });
            }
        });
    }

    // Send a reply
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });
}

app.listen(3000);
