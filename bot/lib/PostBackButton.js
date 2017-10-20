import Button from './Button';

export default class PostBackButton extends Button {
  constructor(title, payload) {
    super(Button.Types.POSTBACK);
    this.title = title;
    this.payload = payload;
  }
}
