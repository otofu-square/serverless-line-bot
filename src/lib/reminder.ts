import { DynamoDB } from 'aws-sdk';
import * as moment from 'moment';
import * as uuid from 'uuid';

const dynamoDB = new DynamoDB.DocumentClient({ region: 'ap-northeast-1' });
const TableName = 'reminders';

export class Reminders {
  static all(): Promise<DynamoDB.ScanOutput> {
    const params = {
      TableName,
    };
    return dynamoDB.scan(params).promise();
  }

  static create(
    to: string,
    cron: string,
    message: string,
  ): Promise<DynamoDB.PutItemOutput> {
    const item = {
      to,
      cron,
      message,
      id: uuid.v1(),
      item: moment().utc().toISOString(),
    };
    const params = {
      TableName,
      Item: item,
    };
    return dynamoDB.put(params).promise();
  }

  static find(subId: string): Promise<DynamoDB.ScanOutput> {
    const params = {
      TableName,
      FilterExpression: 'contains(id, :val)',
      ExpressionAttributeValues: { ':val': subId },
    };
    return dynamoDB.scan(params).promise();
  }

  static delete(id: string): Promise<DynamoDB.DeleteItemOutput> {
    const params = {
      TableName,
      Key: {
        id,
      },
    };
    return dynamoDB.delete(params).promise();
  }
}
