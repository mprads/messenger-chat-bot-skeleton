import * as MessageBuilder from './MessageBuilder';
import Text from '../../app/services/text.json';

export function showHomeMenu(event) {
  return MessageBuilder.homeMenu(event);
}

export function tutorialMessage() {
  return Text.tutorialMessage;
}

export function refocusMessage(event) {
  return MessageBuilder.refocusMessage(event);
}

export function handleAudio() {
  return Text.handleAudio;
}

export function handleImage() {
  return Text.handleImage;
}

export function handleVideo() {
  return Text.handleVideo;
}

export function handlePostback() {
  return Text.handlePostback;
}
