import * as dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  mysql: {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
};
