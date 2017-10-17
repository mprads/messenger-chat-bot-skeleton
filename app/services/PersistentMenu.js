export default function () {
  const Postback = () => ({
    title: 'Postback',
    type: 'postback',
    payload: '{ "intent": "PostbackExample", "data": {} }',
  });

  const Nested = () => ({
    title: 'Nested',
    type: 'nested',
    call_to_actions: [{
      title: 'WebUrl',
      type: 'web_url',
      url: 'https://example.com',
      webview_height_ratio: 'full',
    }],
  });

  const ShamlessPlug = () => ({
    title: 'Mprads',
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
        ShamlessPlug(),
      ],
    };
    return menu;
  };

  this.run = () => {
    const persistentMenu = [];
    persistentMenu.push(createMenu());
    return persistentMenu;
  };
}
