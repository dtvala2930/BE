import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { createCipheriv, createDecipheriv } from 'crypto';
import { hashSync, compareSync } from 'bcryptjs';
import {
  CIPHER_IV,
  CIPHER_KEY,
  CIPHER_MODE,
  JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN,
  JWT_SECRET_KEY,
} from '../../configs/app.config';
import { SALT_ROUNDS } from '../../utils/constant';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async createTokenAndRefreshToken(accountId: number, expiredTime?: string) {
    const access_token = await this.jwtService.signAsync({ accountId });

    const refresh_token = await this.jwtService.signAsync(
      { accountId },
      {
        secret: JWT_SECRET_KEY,
        expiresIn: expiredTime,
      },
    );

    await this.userService.updateUser(accountId, { refresh_token });

    return { access_token, refresh_token };
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

  compareRefreshToken(refreshToken: string, refreshTokenHash: string) {
    const passwordHashWithCrypto = this.encodeWithCrypto(refreshToken);
    const isValidRefreshToken = compareSync(
      passwordHashWithCrypto,
      refreshTokenHash,
    );

    if (!isValidRefreshToken) {
      throw new BadRequestException('refresh-token-invalid');
    }

    return isValidRefreshToken;
  }

  async refreshToken(refresh_token: string) {
    try {
      const verify = await this.jwtService.verifyAsync(refresh_token, {
        secret: JWT_SECRET_KEY,
      });

      const checkExistToken = await this.userService.getUserByField({
        id: verify.id,
        refresh_token,
      });

      if (checkExistToken) {
        return this.createTokenAndRefreshToken(
          verify.accountId,
          JWT_EXPIRED_TIME_RESET_PASSWORD_TOKEN,
        );
      } else {
        throw new HttpException(
          'Refresh token not valid',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (error) {
      throw new HttpException(
        'Refresh token is not valid',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  hanldeVerifyToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      return payload;
    } catch (error) {
      throw new HttpException(
        { statusCode: HttpStatus.UNAUTHORIZED },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
