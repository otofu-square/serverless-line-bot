import { LineMessagingAPI } from './lineMessagingApi';

export const client = new LineMessagingAPI(process.env.lineChannelAccessToken);
