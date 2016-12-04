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
      to: to,
      cron: cron,
      message: message,
    };
    item.id = uuid.v1();
    item.updatedUtc = moment().utc().toISOString();

    const params = {
      TableName: tableName,
      Item: item,
    };

    return dynamoDB.put(params).promise();
  }

  constractor(to, cron, message) {
    this.to = to;
    this.cron = cron;
    this.message = message;
  }
};

// module.exports.update = (db, id, item, callback) => {
//   item.id = id;
//   item.updatedAt = moment().utc().toISOString();
//
//   const params = {
//     TableName : tableName,
//     Item: item
//   };
//
//   return db.put(params, (err, data) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(err, params.Item);
//     }
//   });
// };
//
// module.exports.delete = (db, id, callback) => {
//   const params = {
//     TableName : tableName,
//     Key: {
//       id: id
//     }
//   };
//
//   return db.delete(params, (err, data) => {
//     if (err) {
//       callback(err);
//     } else {
//       callback(err, params.Key);
//     }
//   });
// };
