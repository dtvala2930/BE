import 'dotenv/config';

export const PORT = process.env.PORT;
export const CLIENT_URL = process.env.CLIENT_URL;

// CRYPTO
export const CIPHER_MODE = process.env.CIPHER_MODE;
export const CIPHER_KEY = process.env.CIPHER_KEY;
export const CIPHER_IV = process.env.CIPHER_IV;

//AUTH
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN =
  process.env.JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN;
export const JWT_EXPIRED_TIME_TOKEN = process.env.JWT_EXPIRED_TIME_TOKEN;
export const PASETO_PRIVATE_KEY = process.env.PASETO_PRIVATE_KEY;
export const PASETO_PUBLIC_KEY = process.env.PASETO_PUBLIC_KEY;
