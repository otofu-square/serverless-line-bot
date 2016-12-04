'use strict';

const AWS = require('aws-sdk');
const moment = require('moment');
const uuid = require('uuid');

const dynamoDB = new AWS.DynamoDB.DocumentClient({ region: 'ap-northeast-1' });
const tableName = 'reminders';

module.exports = class Reminders {
  static all() {
    const params = {
      TableName: tableName,
    };

    return dynamoDB.scan(params).promise();
  }

  static create(to, cron, message) {
    const item = {
      to,
      cron,
      message,
    };
    item.id = uuid.v1();
    item.updatedUtc = moment().utc().toISOString();

    const params = {
      TableName: tableName,
      Item: item,
    };

    return dynamoDB.put(params).promise();
  }

  static find(subId) {
    const params = {
      TableName: 'reminders',
      FilterExpression: 'contains(id, :val)',
      ExpressionAttributeValues: { ':val': subId },
    };

    return dynamoDB.scan(params).promise();
  }

  static delete(id) {
    const params = {
      TableName: 'reminders',
      Key: {
        id,
      },
    };

    return dynamoDB.delete(params).promise();
  }
};
