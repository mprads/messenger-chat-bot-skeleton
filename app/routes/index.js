import { Router } from 'express';
import * as BotController from '../controllers/BotController';
// import * as ExtensionController from '../controllers/ExtensionController';

const router = new Router();

export default () => {
  // Webhook validation
  router.get('/webhook', BotController.validate);
  // Message processing
  router.post('/webhook', BotController.handleMessage);

  // Chat Extension
  // router.get('/chatExtension', ExtensionController.show);

  return router;
};
