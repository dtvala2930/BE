import { IsNotEmpty, NotContains } from 'class-validator';

export class AuthLoginDTO {
  @IsNotEmpty({ message: 'id-empty' })
  @NotContains(' ')
  email: string;

  @IsNotEmpty({ message: 'password-empty' })
  @NotContains(' ')
  password: string;
}
