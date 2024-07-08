import { BadRequestException, Injectable } from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';
import { hashSync, compareSync } from 'bcryptjs';
import { signToken, verifyToken } from '../paseto/paseto';
import {
  CIPHER_IV,
  CIPHER_KEY,
  CIPHER_MODE,
  JWT_EXPIRED_TIME_TOKEN,
} from '../../configs/app.config';
import { SALT_ROUNDS } from '../../utils/constant';

@Injectable()
export class AuthService {
  async createTokenAndRefreshToken(accountId: number, expiredTime?: string) {
    const token: string = await this.signPayload(
      { id: accountId },
      expiredTime ? expiredTime : JWT_EXPIRED_TIME_TOKEN,
    );
    return token;
  }

  encodeWithCrypto(text: string) {
    try {
      const cipher = createCipheriv(CIPHER_MODE, CIPHER_KEY, CIPHER_IV);
      const encrypted = cipher.update(text, 'utf8', 'base64');
      return encrypted + cipher.final('base64');
    } catch (error) {
      return null;
    }
  }

  decodeWithCrypto(textHash: string) {
    try {
      const decipher = createDecipheriv(CIPHER_MODE, CIPHER_KEY, CIPHER_IV);
      const decrypted = decipher.update(textHash, 'base64', 'utf8');
      return decrypted + decipher.final('utf8');
    } catch (error) {
      return null;
    }
  }

  hashPassword(password: string): string {
    const passwordHashWithCrypto = this.encodeWithCrypto(password);
    const passwordHash = hashSync(passwordHashWithCrypto, SALT_ROUNDS);
    return passwordHash;
  }

  comparePassword(password: string, passwordHash: string): boolean {
    const passwordHashWithCrypto = this.encodeWithCrypto(password);
    const comparePass = compareSync(passwordHashWithCrypto, passwordHash);
    return comparePass;
  }

  async signPayload(payload: any, expiredTime: string) {
    return await signToken(payload, expiredTime);
  }

  async decodeJwt(str: string): Promise<string | null> {
    try {
      const jwtObj: any = await verifyToken(str);
      return jwtObj.id;
    } catch (e) {
      return null;
    }
  }

  async getTimeExpires(str: string): Promise<string | null> {
    try {
      const jwtObj: any = await verifyToken(str);
      return jwtObj.exp;
    } catch (e) {
      return null;
    }
  }

  compareRefreshToken(refreshToken: string, refreshTokenHash: string) {
    const passwordHashWithCrypto = this.encodeWithCrypto(refreshToken);
    const isValidRefreshToken = compareSync(
      passwordHashWithCrypto,
      refreshTokenHash,
    );

    if (!isValidRefreshToken) {
      throw new BadRequestException('refresh-token-invalid');
    }
  }
}
