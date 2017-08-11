import { DynamoDB } from "aws-sdk";
import * as moment from "moment";
import * as uuid from "uuid";

const dynamoDB = new DynamoDB.DocumentClient({ region: "ap-northeast-1" });
const tableName = "reminders";

export class Reminders {
  public static all(): Promise<DynamoDB.ScanOutput> {
    const params = {
      TableName: tableName,
    };
    return dynamoDB.scan(params).promise();
  }

  public static create(
    to: string,
    cron: string,
    message: string,
  ): Promise<DynamoDB.PutItemOutput> {
    const item = {
      to,
      cron,
      message,
      id: (uuid as any).v1(),
      item: moment().utc().toISOString(),
    };
    const params = {
      TableName: tableName,
      Item: item,
    };
    return dynamoDB.put(params).promise();
  }

  public static find(subId: string): Promise<DynamoDB.ScanOutput> {
    const params = {
      TableName: tableName,
      FilterExpression: "contains(id, :val)",
      ExpressionAttributeValues: { ":val": subId },
    };
    return dynamoDB.scan(params).promise();
  }

  public static delete(id: string): Promise<DynamoDB.DeleteItemOutput> {
    const params = {
      TableName: tableName,
      Key: {
        id,
      },
    };
    return dynamoDB.delete(params).promise();
  }
}
