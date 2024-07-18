import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { PASSWORD_VALID_REGEX } from '../utils/constant';

export function IsValidPassword(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsValidPassword',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          if (typeof value !== 'string') {
            return false;
          }

          const passwordRegex = PASSWORD_VALID_REGEX;
          return passwordRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must contain at least one uppercase letter, one special character, one number, and be at least 8 characters long.`;
        },
      },
    });
  };
}
