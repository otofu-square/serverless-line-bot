import { LineMessagingAPI } from './lineMessagingApi';
import { Reminders } from './reminder';
import { client } from './client';

const parseInfo = (info: string) => {
  const arr = info.split;
  if (arr.length !== 2) return [null, null];
  return arr;
};

export const create = (replyToken: string, to: string, info: string): void => {
  const parsedInfo = parseInfo(info);
  const cron = parsedInfo[0];
  const message = parsedInfo[1];

  Reminders.create(to, cron, message)
    .then(() => {
      client.reply(replyToken, `Successed.\nto: ${to}\ncron: ${cron}\nmessage: ${message}`);
    })
    .catch(err => console.log(err));
};
