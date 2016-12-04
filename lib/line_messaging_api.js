'use strict';

const axios = require('axios');

module.exports = class LineMessagingAPI {
  constructor(channelAccessToken) {
    this.client = axios.create({
      baseURL: 'https://api.line.me/v2/bot/message',
      timeout: 3000,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${channelAccessToken}`,
      },
    });
  }

  reply(replyToken, text) {
    const body = {
      replyToken,
      'messages': [
        {
          'type': 'text',
          text,
        },
      ],
    };
    this._request('/reply', body);
  }

  push(to, text) {
    const body = {
      to,
      'messages': [
        {
          'type': 'text',
          text,
        },
      ],
    };
    this._request('/push', body);
  }

  _request(endpoint, body){
    this.client.post(endpoint, JSON.stringify(body))
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }
}
