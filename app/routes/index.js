import { Router } from 'express';
import * as BotController from '../controllers/BotController';

const router = new Router();

export default () => {
  // Webhook validation
  router.get('/webhook', BotController.validate);
  // Message processing
  router.post('/webhook', BotController.handleMessage);

  return router;
};
