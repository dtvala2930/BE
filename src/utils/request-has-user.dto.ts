import { User } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class RequestHasUserDTO {
  @IsNotEmpty()
  user: User;
}
