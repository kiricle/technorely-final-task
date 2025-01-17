import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createCompany(userId: string, dto: CreateCompanyDto) {
    const isUserExists = await this.userService.getById(userId);

    if (!isUserExists) throw new BadRequestException('The user does not exist');

    const isNameInUse = await this.getByName(dto.name);

    if (isNameInUse)
      throw new BadRequestException('There is company with such name');

    const createdCompany = await this.prisma.company.create({
      data: {
        ...dto,
        owner: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return createdCompany;
  }

  async getCompanies(userId: string) {
    const isUserExists = await this.userService.getById(userId);

    if (!isUserExists) throw new BadRequestException('The user does not exist');

    return this.prisma.company.findMany({
      where: {
        ownerId: userId,
      },
    });
  }

  async getCompany(userId: string, companyName: string) {
    const company = await this.prisma.company.findFirst({
      where: {
        name: companyName,
      },
    });

    if (!company) throw new BadRequestException('There is no such company');

    if (company.ownerId !== userId)
      throw new ForbiddenException("This is not the user's company");

    return company;
  }

  async updateCompany(userId: string, dto: UpdateCompanyDto) {
    const company = await this.prisma.company.findFirst({
      where: {
        id: dto.id,
      },
    });

    if (!company) throw new BadRequestException('There is no such company');

    if (company.ownerId !== userId)
      throw new ForbiddenException('The company does not belong to the user');

    const updatedCompany = await this.prisma.company.update({
      where: {
        id: dto.id,
      },
      data: {
        ...dto,
      },
    });

    return updatedCompany;
  }

  private getByName(name: string) {
    return this.prisma.company.findFirst({
      where: {
        name,
      },
    });
  }
}
