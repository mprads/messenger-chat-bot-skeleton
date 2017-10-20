import Bot from '../../bot/Bot';
import EventToIntent from '../services/EventToIntent';
import Config from '../config/index';

const env = process.env.NODE_ENV || 'development';
const config = Config[env];

// Webhook validation give by facebook
export function validate(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
    req.query['hub.verify_token'] === config.fb.validationToken) {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error('Failed validation. Make sure the validation tokens match.');
    res.sendStatus(403);
  }
}

export function handleMessage(req, res) {
  const data = req.body;
  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach((entry) => {
      // Iterate over each messaging event
      if (entry.messaging) {
        entry.messaging.forEach((event) => {
          const chatBot = new Bot({
            pageAccessToken: config.fb.pageAccessToken,
            appSecret: config.fb.appSecret,
            serverUrl: config.serverUrl,
          });
          const eventToIntent = new EventToIntent(chatBot);
          eventToIntent.handleEvent(event);
        });
      }
      res.sendStatus(200);
    });
    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
  }
}
