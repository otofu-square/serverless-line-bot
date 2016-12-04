'use strict';

const LineMessagingAPI = require('./line_messaging_api');
const Reminders = require('../reminder');

const client = new LineMessagingAPI(process.env.lineChannelAccessToken);

module.exports = (replyToken, id) => {
  console.log(id);
  Reminders.find(id).then(
    data => Reminders.delete(data.Items[0].id)
  ).then(
    () => client.reply(replyToken, `ID: ${id} was deleted.`)
  ).catch(
    (err) => {
      console.log(err);
      client.reply(replyToken, err);
    }
  );
};
