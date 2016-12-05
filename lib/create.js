'use strict';

const LineMessagingAPI = require('./line_messaging_api');
const Reminders = require('./reminder');

const client = new LineMessagingAPI(process.env.lineChannelAccessToken);

function parseInfo(info) {
  const arr = info.split;
  if (arr.length !== 2) return [null, null];
  return arr;
}

module.exports = (replyToken, to, info) => {
  const parsedInfo = parseInfo(info);
  const cron = parsedInfo[0];
  const message = parsedInfo[1];

  Reminders.create(to, cron, message).then(
    () => {
      client.reply(
        replyToken,
        `Successed.\nto: ${to}\ncron: ${cron}\nmessage: ${message}`
      );
    }
  ).catch(
    err => console.log(err)
  );
}
