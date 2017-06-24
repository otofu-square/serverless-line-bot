import { LineMessagingAPI } from './lineMessagingApi';
import { Reminders } from './reminder';
import { client } from './client';

const parseInfo = (info: string): Array<string> => {
  const arr = info.split(' ');
  return arr;
};

export const create = async (
  replyToken: string,
  to: string,
  info: string,
): Promise<void> => {
  const parsedInfo = parseInfo(info);
  const cron = parsedInfo[0];
  const message = parsedInfo[1];

  try {
    await Reminders.create(to, cron, message);
    await client.reply(
      replyToken,
      `Successed.\nto: ${to}\ncron: ${cron}\nmessage: ${message}`,
    );
  } catch (e) {
    console.log(e);
  }
};
