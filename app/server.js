import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import Logger from './middlewares/Logger';

dotenv.config({ path: `${__dirname}/../.env` });

const port = process.env.PORT || 8080;
const env = process.env.NODE_ENV || 'development';

const app = express();
const logger = Logger();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  logger.appStarted(env, port, 'localhost');
});
