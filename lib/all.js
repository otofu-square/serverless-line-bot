'use strict';

const LineMessagingAPI = require('./line_messaging_api');
const Reminders = require('./reminder');

const client = new LineMessagingAPI(process.env.lineChannelAccessToken);

function createResult(data) {
  let str = '';
  for (let i = 0; i < data.length; i += 1) {
    str += `id: ${data[i].id.slice(0, 5)}...,\n`;
    str += `cron: ${data[i].cron},\n`;
    str += `message: ${data[i].message}`;
    if (i !== (data.length - 1)) str += '\n\n';
  }
  return str;
}

module.exports = (replyToken) => {
  Reminders.all().then(
    data => client.reply(replyToken, createResult(data.Items))
  ).catch(
    err => console.log(err)
  );
};
