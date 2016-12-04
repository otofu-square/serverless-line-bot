'use strict';

const LineMessagingAPI = require('./lib/line_messaging_api');
const client = new LineMessagingAPI(process.env.lineChannelAccessToken);

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

  if (lineEvent.message.text === 'ping') {
    client.reply(lineEvent.replyToken, 'pong');
  }

  const response = createResponse(event);
  console.log(response);

  callback(null, response);
}
