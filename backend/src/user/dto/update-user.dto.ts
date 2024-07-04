import { IsEmail, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  id: string;

  @IsEmail()
  email: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  nickname: string;

  @IsString()
  phoneNumber: string;
}
