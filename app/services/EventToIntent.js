export default class EventToIntent {
  constructor(bot) {
    this.bot = bot;
  }

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

  textEvent(textMessage, event) {
    switch (textMessage) {
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

  mediaEvent(payload, event) {
    switch (payload[0].type) {
      case 'audio':
        this.bot.handleAudio(event);
        break;
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
