import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

import { all } from './lib/all';
import { ping } from './lib/ping';
import { create } from './lib/create';
import { deleteBySubId } from './lib/deleteBySubId';

const createResponse = (event: any): Object => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Go Serverless v1.0! Your function executed successfully!',
    body: event.body,
  }),
});

const getFrom = (source: any): string => {
  if (source.groupId) return source.groupId;
  if (source.roomId) return source.roomId;
  if (source.userId) return source.userId;
  return 'undefined';
};

export const main = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): void => {
  const lineEvent = JSON.parse(event.body!).events[0];
  const replyToken = lineEvent.replyToken;
  const text = lineEvent.message.text;
  const from = getFrom(lineEvent.source);

  if (text === 'ping') ping(replyToken);
  if (text === 'reminder all') all(replyToken);
  if (text.match(/^reminder delete /)) {
    deleteBySubId(replyToken, text.match(/^reminder delete (.*)/)[1]);
  }
  if (text.match(/^reminder add /)) {
    create(replyToken, from, text.match(/^reminder add (.*)/)[1]);
  }

  const response = createResponse(event);
  console.log(response);
};
