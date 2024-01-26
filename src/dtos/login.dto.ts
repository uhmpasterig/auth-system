import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isEitherNameOrEmail', async: false })
export class IsEitherNameOrEmail implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const object = args.object as LoginDto;
    return !!(object.name || object.email);
  }

  defaultMessage(args: ValidationArguments) {
    return 'Either name or email must be provided';
  }
}

export class LoginDto {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(4, 20)
  name?: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @Validate(IsEitherNameOrEmail)
  nameOrEmail: string;
}
