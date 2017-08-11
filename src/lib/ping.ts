import { client } from "./client";
import { LineMessagingAPI } from "./lineMessagingApi";

export const ping = (replyToken: string): void =>
  client.reply(replyToken, "pong");
