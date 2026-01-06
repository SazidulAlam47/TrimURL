import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    client_url: process.env.CLIENT_URL,
    short_url_length: process.env.SHORT_URL_LENGTH,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS as string,
    node_mailer: {
        email: process.env.NODE_MAILER_EMAIL as string,
        password: process.env.NODE_MAILER_PASSWORD as string,
    },
    jwt: {
        access_token_secret: process.env.ACCESS_TOKEN_SECRET,
        access_token_expires_in: process.env.ACCESS_TOKEN_EXPIRES_IN,
        refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
        refresh_token_expires_in: process.env.REFRESH_TOKEN_EXPIRES_IN,
        reset_pass_secret: process.env.RESET_PASS_TOKEN,
        reset_pass_token_expires_in: process.env.RESET_PASS_TOKEN_EXPIRES_IN,
    },
};
