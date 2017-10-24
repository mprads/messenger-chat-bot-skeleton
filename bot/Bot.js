import request from 'request';
import PersistentMenu from './services/PersistentMenu';
import Text from '../app/services/text.json';
import * as Responses from './services/Responses';

export default class Bot {
  constructor(config) {
    this.config = config;
  }
  // Here you can add bot actions, they should all take in the event object
  // If you are sending a Facebook element, build the object and pass to callSendAPI()
  // If you are sending a text message pass a string to createTextMessage()
  async showHomeMenu(event) {
    const message = await Responses.showHomeMenu(event);
    this.callSendAPI(message);
  }

  async tutorialMessage(event) {
    const message = await Responses.tutorialMessage();
    this.createTextMessage(event, message);
  }

  // This is the default action if the bot did not understand the users message
  async refocusMessage(event) {
    const message = await Responses.refocusMessage(event);
    this.callSendAPI(message);
  }

  async handleAudio(event) {
    const message = await Responses.handleAudio();
    this.createTextMessage(event, message);
  }

  async handleImage(event) {
    const message = await Responses.handleImage();
    this.createTextMessage(event, message);
  }

  async handleVideo(event) {
    const message = await Responses.handleVideo();
    this.createTextMessage(event, message);
  }

  // All postbacks that are not handled at the eventToIntent will come through here
  // with their intent that you can then determine how it handles the postback
  async handlePostback(event) {
    const message = await Responses.handlePostback();
    this.createTextMessage(event, message);
  }
  /**
   * Takes in the event object and a string, creates a message to be passed to callSendAPI() to send to user
   * @param  {Object} event
   * @param  {String} messageText
   */
  createTextMessage(event, messageText) {
    const messageData = {
      recipient: {
        id: event.sender.id,
      },
      message: {
        text: messageText,
        metadata: 'DEVELOPER_DEFINED_METADATA',
      },
    };
    this.callSendAPI(messageData);
  }

  /**
   * Provided by facebook and takes in a message object and sends to the user
   * @param  {Object} messageData
   */
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
  /**
   * Takes in JSON to add an intent to the get started button
   * @param  {JSON} payload
   */
  setGetStarted(payload) {
    const obj = {
      get_started: {
        payload,
      },
    };
    this.update(obj, 'Set Get Started');
  }

  // Only visible on mobile platforms when the user opens a conversation with the bot for the first time
  /**
   * Takes in an object of the local and the text for the greeting
   * @param  {Object} payload
   */
  setGreeting(payload) {
    const obj = {
      setting_type: 'greeting',
      greeting: payload,
    };
    this.update(obj, 'Set Gretting');
  }

  setPersistentMenu() {
    const obj = {
      persistent_menu: PersistentMenu(),
    };
    this.update(obj, 'Set Persistent Menu');
  }
  /**
   * Takes in a string of a url, mostly likely somthing you defined in your routes if you want to open a webview
   * with messenger extensions
   * @param  {String} url
   */
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
  /**
   * Takes in a string of a url, which will be your ngrok or localtunnel url so that facebook accepts
   * the webhook callback url
   * @param  {String} url
   */
  whiteListUrl(url) {
    const obj = {
      whitelisted_domains: [url],
    };
    this.update(obj, 'Whitelist URL');
  }
  /**
   * Takes in the payload object and functions name then sends a request to facebook to up date the certain feature
   * logs in console if the request failed or passed
   * @param  {Object} payload
   * @param  {String} functionName
   */
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
      text: Text.greeting,
    }]);
    // Configure Bot Get Started Button
    this.setGetStarted('{ "intent": "GET_STARTED" }');
  }
}
