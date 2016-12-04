'use strict';

const all = require('./lib/all');
const ping = require('./lib/ping');

function createResponse(event) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      body: event.body,
    }),
  };
}

module.exports.main = (event, context, callback) => {
  const lineEvent = JSON.parse(event.body).events[0];
  const replyToken = lineEvent.replyToken;

  if (lineEvent.message.text === 'ping') ping(replyToken);
  if (lineEvent.message.text === 'reminder all') all(replyToken);

  const response = createResponse(event);
  console.log(response);
}
