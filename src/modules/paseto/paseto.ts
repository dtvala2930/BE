import { V4 } from 'paseto';
import {
  PASETO_PRIVATE_KEY,
  PASETO_PUBLIC_KEY,
} from '../../configs/app.config';

const formatKeyPrivate = `
-----BEGIN PRIVATE KEY-----
PRIVATE_KEY
-----END PRIVATE KEY-----
`;

const formatKeyPublic = `
-----BEGIN PUBLIC KEY-----
PUBLIC_KEY
-----END PUBLIC KEY-----
`;

export const signToken = async (
  payload: Record<string, any>,
  expiresIn: string,
) => {
  let privateKey;

  try {
    privateKey = formatKeyPrivate.replace('PRIVATE_KEY', PASETO_PRIVATE_KEY);
  } catch (error) {
    console.log('Paseto');
    console.log(JSON.stringify(error, null, 4));
    return null;
  }

  try {
    const token = await V4.sign(payload, privateKey, { expiresIn: expiresIn });
    return token;
  } catch (error) {
    console.log('Paseto');
    console.log(JSON.stringify(error, null, 4));
    return null;
  }
};

export const verifyToken = async (token: string) => {
  let publicKey;

  try {
    publicKey = formatKeyPublic.replace('PUBLIC_KEY', PASETO_PUBLIC_KEY);
  } catch (error) {
    console.log('Paseto');
    console.log(JSON.stringify(error, null, 4));
    return null;
  }

  try {
    const payload = await V4.verify(token, publicKey);
    return payload;
  } catch (error) {
    console.log('Paseto');
    console.log(JSON.stringify(error, null, 4));
    return null;
  }
};
