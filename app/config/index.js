import fbConfig from './fb';

const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../.env` });

export default {
  production: {
    fb: fbConfig,
    serverUrl: process.env.SERVER_URL,
  },
  development: {
    fb: fbConfig,
    serverUrl: process.env.SERVER_URL,
  },
};
