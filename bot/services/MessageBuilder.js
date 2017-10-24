import PostBackButton from '../lib/PostBackButton';
import WebUrlButton from '../lib/WebUrlButton';
import GenericTemplate from '../lib/GenericTemplate';
import QuickReplyMessage from '../lib/QuickReplyMessage';
import QuickReply from '../lib/QuickReply';
import Text from '../../app/services/text.json';

/**
 * Takes in the string of the message content and the event object and returns a new message object
 * @param {String} quickReplyMessage
 * @param {Object} event
 * @return {Object} messageObject
 */
function buildQuickReply(quickReplyMessage, event) {
  const messageObject = {};
  messageObject.recipient = {
    id: event.sender.id,
  };
  messageObject.message = quickReplyMessage;
  return messageObject;
}

/**
 * Takes in the array of elements and event object returns a menu in the from of a message object
 * @param  {Array} elements
 * @param  {Object} event
 * @return {Object} menuObject
 */
function buildMenu(elements, event) {
  const menuObject = {};
  const message = {};
  const payload = {};
  const attachment = {};

  payload.elements = elements;
  payload.template_type = 'generic';

  attachment.type = 'template';
  attachment.payload = payload;

  message.attachment = attachment;

  menuObject.message = message;

  menuObject.recipient = {
    id: event.sender.id,
  };
  return menuObject;
}

/**
 * Takes in the event object, creates a quick reply with text coming from the Text.json file. Returns the message object
 * @param  {Object} event
 * @return {Object} messageObject
 */
export async function refocusMessage(event) {
  const quickReplyMessage = new QuickReplyMessage(Text.refocusMessage);
  quickReplyMessage.addQuickReply(new QuickReply(Text.home, '{ "intent": "HOME" }'));
  const messageObject = await buildQuickReply(quickReplyMessage, event);
  return messageObject;
}

/**
 * Takes in the event object and creates then element for the home menu. Returns a the menu object
 * @param  {Object} event
 * @return {Object} menuObject
 */
export async function homeMenu(event) {
  const elements = [];

  const genericTemplateOne = new GenericTemplate(Text.homeMenu, 'http://via.placeholder.com/300x600');
  genericTemplateOne.addButton(new PostBackButton(Text.postback, '{ "intent": "POSTBACK" }'));
  genericTemplateOne.addButton(new WebUrlButton(Text.redirect, 'https://example.com', WebUrlButton.webViewHeightRatio.full));

  elements.push(genericTemplateOne);

  const genericTemplateTwo = new GenericTemplate(Text.secondMenu, 'http://via.placeholder.com/300x600');
  genericTemplateTwo.addButton(new WebUrlButton(Text.shamelessPlug, 'https://github.com/mprads', WebUrlButton.webViewHeightRatio.full));

  elements.push(genericTemplateTwo);
  const menuObject = await buildMenu(elements, event);
  return menuObject;
}
