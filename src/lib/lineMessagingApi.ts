import axios from 'axios';

export class LineMessagingAPI {
  client: any;

  constructor(channelAccessToken: string) {
    this.client = axios.create({
      baseURL: 'https://api.line.me/v2/bot/message',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${channelAccessToken}`
      }
    });
  }

  reply(replyToken: string, text: string): void {
    const body = {
      replyToken,
      messages: [
        {
          type: 'text',
          text
        }
      ]
    };
    this.request('/reply', body);
  }

  push(to: string, text: string): void {
    const body = {
      to,
      messages: [
        {
          type: 'text',
          text
        }
      ]
    };
    this.request('/push', body);
  }

  private request(endpoint: string, body: Object): void {
    this.client
      .post(endpoint, JSON.stringify(body))
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error.response.data);
      });
  }
}
