import { IsNumber, IsString } from 'class-validator';

export class CreateCompanyDto {
  @IsString()
  name: string;

  @IsString()
  address: string;

  @IsString()
  serviceOfActivity: string;

  @IsNumber()
  numberOfEmployees: number;

  @IsString()
  description: string;

  @IsString()
  type: string;
}
