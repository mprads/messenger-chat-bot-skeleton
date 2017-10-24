// This is where you can create your own buttons on the persistent menu
// Below is an example of each type possible through facebook
// Go to https://developers.facebook.com/docs/messenger-platform/send-messages/persistent-menu to see more examples
import Text from '../../app/services/text.json';

export default function () {
  const Postback = () => ({
    title: Text.postback,
    type: 'postback',
    payload: '{ "intent": "POSTBACK", "data": {} }',
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

  function createMenu() {
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
  }

  // Persistent menu needs to be an array
  const persistentMenu = [];
  persistentMenu.push(createMenu());
  return persistentMenu;
}
