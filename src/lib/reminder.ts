import { DynamoDB } from "aws-sdk";
import * as moment from "moment";
import * as uuid from "uuid";

const dynamoDB = new DynamoDB.DocumentClient({ region: "ap-northeast-1" });
const tableName = "reminders";

export const all = () =>
  dynamoDB
    .scan({
      TableName: tableName,
    })
    .promise();

export const create = (to: string, cron: string, message: string) =>
  dynamoDB
    .put({
      TableName: tableName,
      Item: {
        to,
        cron,
        message,
        id: (uuid as any).v1(),
        item: moment().utc().toISOString(),
      },
    })
    .promise();

export const find = (subId: string) =>
  dynamoDB
    .scan({
      TableName: tableName,
      FilterExpression: "contains(id, :val)",
      ExpressionAttributeValues: { ":val": subId },
    })
    .promise();

export const deleted = (id: string) =>
  dynamoDB
    .delete({
      TableName: tableName,
      Key: {
        id,
      },
    })
    .promise();
