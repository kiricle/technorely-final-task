import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UsePipes(new ValidationPipe())
  @Post('')
  @Auth()
  createCompany(@CurrentUser('id') userId, @Body() dto: CreateCompanyDto) {
    return this.companyService.createCompany(userId, dto);
  }

  @Get('')
  @Auth()
  getCompanies(@CurrentUser('id') userId) {
    return this.companyService.getCompanies(userId);
  }

  @Get('/:name')
  @Auth()
  getCompany(@CurrentUser('id') userId, @Param('name') companyName: string) {
    return this.companyService.getCompany(userId, companyName);
  }

  @UsePipes(new ValidationPipe())
  @Patch('')
  @Auth()
  updateCompany(@CurrentUser('id') userId, @Body() dto: UpdateCompanyDto) {
    return this.companyService.updateCompany(userId, dto);
  }
}
