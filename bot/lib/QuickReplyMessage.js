export default class QuickReplyMessage {
  constructor(text) {
    this.text = text;
    this.quick_replies = [];
  }

  addQuickReply(quickReply) {
    this.quick_replies.push(quickReply);
  }
}
