import axios, { AxiosInstance } from 'axios';

export class LineMessagingAPI {
  client: AxiosInstance;

  constructor(channelAccessToken: string) {
    this.client = axios.create({
      baseURL: 'https://api.line.me/v2/bot/message',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${channelAccessToken}`,
      },
    });
  }

  reply(replyToken: string, text: string): void {
    const body = {
      replyToken,
      messages: [
        {
          type: 'text',
          text,
        },
      ],
    };
    this.request('/reply', body);
  }

  push(to: string, text: string): void {
    const body = {
      to,
      messages: [
        {
          type: 'text',
          text,
        },
      ],
    };
    this.request('/push', body);
  }

  private async request(endpoint: string, body: Object): Promise<void> {
    try {
      const response = await this.client.post(endpoint, JSON.stringify(body));
      console.log(response);
    } catch (e) {
      console.log(e.response.data);
    }
  }
}
