export default class GenericTemplate {
  constructor(title, imageUrl, itemURL) {
    this.title = title;
    this.image_url = imageUrl;

    if (itemURL) {
      this.item_url = itemURL;
    }
  }

  addButton(button) {
    if (this.buttons === undefined) {
      this.buttons = [];
    }
    this.buttons.push(button);
  }
}
