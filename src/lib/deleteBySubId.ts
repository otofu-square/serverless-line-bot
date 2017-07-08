import { client } from './client';
import { LineMessagingAPI } from './lineMessagingApi';
import { Reminders } from './reminder';

export const deleteBySubId = async (
  replyToken: string,
  id: string,
): Promise<void> => {
  try {
    const result: any = await Reminders.find(id);
    Reminders.delete(result.Items[0].id);
    client.reply(replyToken, `ID: ${id} was deleted.`);
  } catch (e) {
    console.log(e);
    client.reply(replyToken, e);
  }
};
