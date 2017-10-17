import request from 'request';
import PersistentMenu from '../app/services/PersistentMenu';

export default class Bot {
  constructor(config) {
    this.config = config;
    this.persistentMenuData = new PersistentMenu();
  }

  setGetStarted(payload) {
    const obj = {
      get_started: {
        payload,
      },
    };
    this.update(obj, 'Set Get Started');
  }

  setGreeting(payload) {
    const obj = {
      setting_type: 'greeting',
      greeting: payload,
    };
    this.update(obj, 'Set Gretting');
  }

  setPersistentMenu() {
    const obj = {
      persistent_menu: this.persistentMenuData.run(),
    };
    this.update(obj, 'Set Persistent Menu');
  }

  setExtensionUrl(url) {
    const obj = {
      home_url: {
        url,
        webview_height_ratio: 'tall',
        in_test: false,
      },
    };
    this.update(obj, 'Set Extension URL');
  }

  whiteListUrl(url) {
    const obj = {
      whitelisted_domains: [url],
    };
    this.update(obj, 'Whitelist URL');
  }

  callSendAPI(messageData) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: this.config.pageAccessToken },
      method: 'POST',
      json: messageData,
    }, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const recipientId = body.recipient_id;
        console.log('Message sent to ', recipientId);
      } else {
        console.error('Unable to send message.');
        console.error(response);
        console.error(error);
      }
    });
  }

  update(payload, functionName) {
    request({
      uri: 'https://graph.facebook.com/v2.6/me/messenger_profile',
      qs: {
        access_token: this.config.pageAccessToken,
      },
      method: 'POST',
      json: payload,
    }, (error, response) => {
      if (error) {
        console.log(error, `=============> Error at ${functionName}`);
      } else if (response.body.result === 'success') {
        console.log(`Success at ${functionName}`);
      } else {
        console.log(error, `=============> Error at ${functionName}`);
      }
    });
  }

  init() {
    // whitelist server
    this.whiteListUrl(this.config.serverUrl);
    // chatexentsion url
    this.setExtensionUrl(`${this.config.serverUrl}/bot/chatExtension`);
    // Persistent Menu
    this.setPersistentMenu();
    // Update Bot Greeting
    this.setGreeting([{
      locale: 'default',
      text: 'Hello and welcome to your chatbot skeleton',
    }]);

    // Configure Bot Get Started Button
    this.setGetStarted('{ "intent": "GET_STARTED" }');
  }
}
