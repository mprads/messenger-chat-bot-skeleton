const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/../../.env` });

export default {
  appSecret: process.env.MESSENGER_APP_SECRET,
  verifyToken: process.env.MESSENGER_VERIFY_TOKEN,
  pageAccessToken: process.env.MESSENGER_PAGE_ACCESS_TOKEN,
};
