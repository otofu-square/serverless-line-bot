import { client } from "./client";
import { LineMessagingAPI } from "./lineMessagingApi";
import { Reminders } from "./reminder";

const parseInfo = (info: string): string[] => {
  const arr = info.split(" ");
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
