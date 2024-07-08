import { Body, Controller, Logger, Post } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { API_PREFIX_PATH } from '../../../utils/constant';
import { UserService } from '../../user/user.service';

@Controller()
export class AuthRefreshTokenController {
  logger = new Logger(AuthRefreshTokenController.name);

  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post(`${API_PREFIX_PATH}/auth/refresh-token`)
  async loginLocal(@Body() { refresh_token }) {
    return this.authService.refreshToken(refresh_token);
  }
}
