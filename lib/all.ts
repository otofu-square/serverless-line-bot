import { LineMessagingAPI } from './lineMessagingApi';
import { Reminders } from './reminder';
import { client } from './client';

const createResult = (data: Array<any>): string => {
  let str = '';
  for (let i = 0; i < data.length; i += 1) {
    str += `id: ${data[i].id.slice(0, 5)}...,\n`;
    str += `cron: ${data[i].cron},\n`;
    str += `message: ${data[i].message}`;
    if (i !== data.length - 1) str += '\n\n';
  }
  return str;
};

export const all = (replyToken: string): void => {
  Reminders.all()
    .then(data => client.reply(replyToken, createResult(data.Items)))
    .catch(err => console.log(err));
};
