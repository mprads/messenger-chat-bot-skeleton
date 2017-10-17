import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import Logger from './middlewares/Logger';
import Bot from '../bot/Bot';

dotenv.config({ path: `${__dirname}/../.env` });

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';

const app = express();
const logger = Logger();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const chatBot = new Bot({
  pageAccessToken: process.env.MESSENGER_PAGE_ACCESS_TOKEN,
  appSecret: process.env.MESSENGER_APP_SECRET,
  serverUrl: process.env.SERVER_URL,
});

chatBot.init();

app.listen(port, () => {
  logger.appStarted(env, port, 'localhost');
});
