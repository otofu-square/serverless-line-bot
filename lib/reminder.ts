import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import * as uuid from 'uuid';

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-1' });
const TableName = 'reminders';

export class Reminders {
  static all() {
    const params = {
      TableName
    };
    return dynamoDB.scan(params).promise();
  }

  static create(to: string, cron: string, message: string) {
    const item = {
      to,
      cron,
      message
    };
    item['id'] = uuid.v1();
    item['updatedAt'] = moment().utc().toISOString();

    const params = {
      TableName,
      Item: item
    };

    return dynamoDB.put(params).promise();
  }

  static find(subId: string) {
    const params = {
      TableName,
      FilterExpression: 'contains(id, :val)',
      ExpressionAttributeValues: { ':val': subId }
    };

    return dynamoDB.scan(params).promise();
  }

  static delete(id: string) {
    const params = {
      TableName,
      Key: {
        id
      }
    };

    return dynamoDB.delete(params).promise();
  }
}
