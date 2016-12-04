'use strict';

const all = require('./lib/all');
const ping = require('./lib/ping');
const deleteBySubID = require('./lib/delete');

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
  const text = lineEvent.message.text;

  if (text === 'ping') ping(replyToken);
  if (text === 'reminder all') all(replyToken);
  if (text.match(/^reminder delete /)) {
    deleteBySubID(replyToken, text.match(/^reminder delete (.*)/)[1]);
  }

  const response = createResponse(event);
  console.log(response);
};
