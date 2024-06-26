import {
  IsEmail,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class SignUpDto {
  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 0,
    minLength: 4,
    minUppercase: 0,
  })
  password: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  position: string;

  @IsPhoneNumber('UA')
  phoneNumber: string;

  @IsString()
  nickname: string;
}
