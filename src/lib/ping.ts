import { LineMessagingAPI } from './lineMessagingApi';
import { client } from './client';

export const ping = (replyToken: string): void =>
  client.reply(replyToken, 'pong');
