import { IsEmail, IsNotEmpty, NotContains } from 'class-validator';
import { IsValidEmail } from '../../../decorator/is-valid-email.decorator';
import { IsValidPassword } from '../../../decorator/is-valid-password.decorator';

export class AuthRegisterDTO {
  @IsNotEmpty({ message: 'id-empty' })
  @IsValidEmail({ message: 'invalid-email' })
  @NotContains(' ')
  @IsEmail()
  email: string;

  @IsNotEmpty({ message: 'firstname-empty' })
  @NotContains(' ')
  firstName: string;

  @IsNotEmpty({ message: 'lastname-empty' })
  @NotContains(' ')
  lastName: string;

  @IsNotEmpty({ message: 'password-empty' })
  @IsValidPassword({ message: 'invalid-password' })
  @NotContains(' ')
  password: string;
}
