import { LineMessagingAPI } from './lineMessagingApi';
import { Reminders } from './reminder';
import { client } from './client';

export const deleteBySubId = (replyToken: string, id: string): void => {
  Reminders.find(id)
    .then(data => Reminders.delete(data.Items[0].id))
    .then(() => client.reply(replyToken, `ID: ${id} was deleted.`))
    .catch(err => {
      console.log(err);
      client.reply(replyToken, err);
    });
};
