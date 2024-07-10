import { forwardRef, Module } from '@nestjs/common';
import { Gateway } from './gateway';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [Gateway],
  exports: [Gateway],
})
export class GatewayModule {}
