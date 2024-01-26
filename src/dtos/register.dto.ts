import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  Length,
  IsStrongPassword,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Length(4, 25)
  @IsString()
  name: string;

  @IsNotEmpty()
  @Length(5, 50)
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  @MinLength(6)
  password: string;
}
