export default class EventToIntent {
  constructor(bot) {
    this.bot = bot;
  }
  /**
   * Takes in the event object and passes to the appropriate handler function based off message type
   * @param {Object} event
   */
  handleEvent(event) {
    if (event.message && event.message.quick_reply) {
      this.quickReplyEvent(event.message.quick_reply.payload, event);
    } else if (event.postback && event.postback.payload) {
      this.postbackEvent(event.postback.payload, event);
    } else if (event.message && event.message.text) {
      this.textEvent(event.message.text, event);
    } else if (event.message && event.message.attachments) {
      this.mediaEvent(event.message.attachments, event);
    } else {
      this.parseDefault(event);
    }
  }

  /**
   * Takes in the text from the message and filters through and calls the appropriate bot action passing the event
   * @param  {String} text
   * @param  {Object} event
   */
  textEvent(text, event) {
    switch (text) {
      case 'home':
        this.bot.showHomeMenu(event);
        break;
      case 'hi':
      case 'help':
      case 'hello':
        this.bot.tutorialMessage(event);
        break;
      default:
        this.bot.refocusMessage(event);
        break;
    }
  }

  /**
   * Takes in the payload JSON and parses the intent and filters through and calls the appropriate bot action passing the event
   * @param  {JSON} payload
   * @param  {Object} event
   */
  postbackEvent(payload, event) {
    const data = JSON.parse(payload);
    switch (data.intent) {
      case 'GET_STARTED':
        this.bot.tutorialMessage(event);
        break;
      case 'HOME':
        this.bot.showHomeMenu(event);
        break;
      case 'POSTBACK':
        this.bot.handlePostback(event);
        break;
      default:
        this.bot.refocusMessage(event);
        break;
    }
  }

  /**
   * Takes in the payload JSON and parses the intent and filters through and calls the appropriate bot action passing the event
   * @param  {JSON} payload
   * @param  {Object} event
   */
  quickReplyEvent(payload, event) {
    const data = JSON.parse(payload);
    switch (data.intent) {
      case 'HOME':
        this.bot.showHomeMenu(event);
        break;
      default:
        this.bot.refocusMessage(event);
        break;
    }
  }

  /**
   * Takes in the payload array and parses the type and filters through and calls the appropriate bot action passing the event
   * @param  {Array} payload
   * @param  {Object} event
   */
  mediaEvent(payload, event) {
    switch (payload[0].type) {
      case 'audio':
        this.bot.handleAudio(event);
        break;
      // Gifs and images both fall under the type 'image'
      case 'image':
        this.bot.handleImage(event);
        break;
      case 'video':
        this.bot.handleVideo(event);
        break;
      default:
        this.bot.refocusMessage(event);
        break;
    }
  }
}
