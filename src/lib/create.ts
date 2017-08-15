import { client } from "./client";
import { LineMessagingAPI } from "./lineMessagingApi";
import * as Reminders from "./reminder";

import { lensIndex, pipe, view } from "ramda";

const parseInfo = (info: string) => info.split(" ");

const getCronFromInfo = pipe<string, string[], string>(
  parseInfo,
  view(lensIndex(0)),
);

const getMessageFromInfo = pipe<string, string[], string>(
  parseInfo,
  view(lensIndex(1)),
);

export const create = async (
  replyToken: string,
  to: string,
  info: string,
): Promise<void> => {
  const cron = getCronFromInfo(info);
  const message = getMessageFromInfo(info);

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
