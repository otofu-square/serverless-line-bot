'use strict';

const LineMessagingAPI = require('./line_messaging_api');

const client = new LineMessagingAPI(process.env.lineChannelAccessToken);

module.exports = (replyToken) => {
  client.reply(replyToken, 'pong');
};
