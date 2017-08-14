import { client } from "./client";
import { LineMessagingAPI } from "./lineMessagingApi";

export const ping = (replyToken: string) => client.reply(replyToken, "pong");
