import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import Logger from './middlewares/Logger';
import Bot from '../bot/Bot';
import Config from './config/index';

dotenv.config({ path: `${__dirname}/../.env` });

const env = process.env.NODE_ENV || 'development';
const port = process.env.PORT || 8080;
const config = Config[env];

const app = express();
const logger = Logger();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const chatBot = new Bot({
  pageAccessToken: config.fb.pageAccessToken,
  appSecret: config.fb.appSecret,
  serverUrl: process.env.SERVER_URL,
});

chatBot.init();

app.listen(port, () => {
  logger.appStarted(env, port, 'localhost');
});
