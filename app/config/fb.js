const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../.env` });

export default {
  appSecret: process.env.MESSENGER_APP_SECRET,
  validationToken: process.env.MESSENGER_VALIDATION_TOKEN,
  pageAccessToken: process.env.MESSENGER_PAGE_ACCESS_TOKEN,
};
