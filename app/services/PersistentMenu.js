// This is where you can create your own buttons on the persistent menu
// Below is an example of each type possible through facebook
import Text from './text.json';

export default function () {
  const Postback = () => ({
    title: Text.postback,
    type: 'postback',
    payload: '{ "intent": "PostbackExample", "data": {} }',
  });

  const Nested = () => ({
    title: Text.nested,
    type: 'nested',
    call_to_actions: [{
      title: Text.webUrl,
      type: 'web_url',
      url: 'https://example.com',
      webview_height_ratio: 'full',
    }],
  });

  const ShamelessPlug = () => ({
    title: Text.shamelessPlug,
    type: 'web_url',
    url: 'https://github.com/mprads',
    webview_height_ratio: 'full',
  });

  const createMenu = () => {
    const menu = {
      locale: 'default',
      composer_input_disabled: false,
      call_to_actions: [
        Postback(),
        Nested(),
        ShamelessPlug(),
      ],
    };
    return menu;
  };

  // Persistent menu need to be an array
  this.run = () => {
    const persistentMenu = [];
    persistentMenu.push(createMenu());
    return persistentMenu;
  };
}
