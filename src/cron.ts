import { APIGatewayEvent, Context, Callback } from 'aws-lambda';

export const main = (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback,
): void => {
  console.log('exec');
};
