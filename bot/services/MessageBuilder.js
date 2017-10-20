import PostBackButton from '../lib/PostBackButton';
import WebUrlButton from '../lib/WebUrlButton';
import GenericTemplate from '../lib/GenericTemplate';
import QuickReplyMessage from '../lib/QuickReplyMessage';
import QuickReply from '../lib/QuickReply';
import Text from '../../app/services/text.json';

function buildQuickReply(quickReplyMessage, event) {
  const msgObj = {};
  msgObj.recipient = {
    id: event.sender.id,
  };
  msgObj.message = quickReplyMessage;
  return msgObj;
}

function buildCarousel(elements, event) {
  const msgObj = {};
  const message = {};
  const payload = {};
  const attachment = {};

  payload.elements = elements;
  payload.template_type = 'generic';

  attachment.type = 'template';
  attachment.payload = payload;

  message.attachment = attachment;

  msgObj.message = message;

  msgObj.recipient = {
    id: event.sender.id,
  };
  return msgObj;
}

export function refocusMessage(event) {
  const quickReplyMessage = new QuickReplyMessage(Text.refocusMessage);
  quickReplyMessage.addQuickReply(new QuickReply(Text.home, '{ "intent": "HOME" }'));
  return buildQuickReply(quickReplyMessage, event);
}

export function homeMenu(event) {
  const elements = [];

  const genericTemplateOne = new GenericTemplate(Text.homeMenu, 'http://via.placeholder.com/300x600');
  genericTemplateOne.addButton(new PostBackButton(Text.postback, '{ "intent": "POSTBACK" }'));
  genericTemplateOne.addButton(new WebUrlButton(Text.redirect, 'https://example.com', WebUrlButton.WebViewHeightRatio.FULL));

  elements.push(genericTemplateOne);

  const genericTemplateTwo = new GenericTemplate(Text.secondMenu, 'http://via.placeholder.com/300x600');
  genericTemplateTwo.addButton(new WebUrlButton(Text.shamelessPlug, 'https://github.com/mprads', WebUrlButton.WebViewHeightRatio.FULL));

  elements.push(genericTemplateTwo);
  return buildCarousel(elements, event);
}
