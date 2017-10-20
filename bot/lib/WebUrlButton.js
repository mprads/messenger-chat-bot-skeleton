import Button from './Button';

export default class WebUrlButton extends Button {
  constructor(title, url, webviewHeightRatio, messengerExtensions, fallbackUrl) {
    super(Button.Types.WEBURL);
    this.title = title;
    this.url = url;
    this.webview_height_ratio = webviewHeightRatio;

    if (messengerExtensions) {
      this.messenger_extensions = messengerExtensions;
    }
    if (fallbackUrl) {
      this.fallback_url = fallbackUrl;
    }
  }

  static get WebViewHeightRatio() {
    return {
      COMPACT: 'compact',
      TALL: 'tall',
      FULL: 'full',
    };
  }
}
