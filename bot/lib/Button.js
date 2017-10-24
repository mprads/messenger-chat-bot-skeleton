export default class Button {
  constructor(type) {
    this.type = type;
  }

  static get types() {
    return {
      postback: 'postBack',
      webUrl: 'web_url',
      elementShare: 'element_share',
    };
  }

  getType() {
    return this.type;
  }
}
