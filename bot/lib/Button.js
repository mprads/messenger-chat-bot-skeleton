export default class Button {
  constructor(type) {
    this.type = type;
  }

  static get Types() {
    return {
      POSTBACK: 'postBack',
      WEBURL: 'web_url',
      ELEMENTSHARE: 'element_share',
    };
  }

  getType() {
    return this.type;
  }
}
