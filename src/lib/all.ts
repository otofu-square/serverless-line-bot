import { concat, map, partialRight, pipe } from "ramda";

import { client } from "./client";
import { LineMessagingAPI } from "./lineMessagingApi";
import { Reminders } from "./reminder";

const createResult = pipe(
  map(
    (d: any) => `id: ${d.id.slice(0, 5)}...,
cron: ${d.cron}
message: ${d.message}`,
  ),
  partialRight(concat, "\n"),
);

export const all = async (replyToken: string): Promise<void> => {
  try {
    const result = await Reminders.all();
    await client.reply(replyToken, createResult(result.Items!));
  } catch (e) {
    console.log(e);
  }
};
