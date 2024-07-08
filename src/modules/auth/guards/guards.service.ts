import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ServiceGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const account = request.user;
    if (account) {
      return true;
    }
    throw new UnauthorizedException('unauthorized-access');
  }
}
