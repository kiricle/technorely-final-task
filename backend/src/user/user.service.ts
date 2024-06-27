import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, verify } from 'argon2';
import { SignUpDto } from 'src/auth/dto/auth.dto';
import { SignInDto } from 'src/auth/dto/sign-in.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async validateUser(dto: SignInDto) {
    const user = await this.getByEmail(dto.email);

    if (!user) throw new BadRequestException('User not found');

    const isPasswordValid = await verify(user.hash, dto.password);

    if (!isPasswordValid)
      throw new UnauthorizedException('Password is invalid');

    return user;
  }

  getByEmail(email: string) {
    return this.prisma.user.findFirst({ where: { email } });
  }

  getByNickname(nickname: string) {
    return this.prisma.user.findFirst({ where: { nickname } });
  }

  async create({
    email,
    password,
    firstName,
    lastName,
    position,
    phoneNumber,
    nickname,
  }: SignUpDto) {
    return this.prisma.user.create({
      data: {
        email: email,
        hash: await hash(password),
        firstName,
        lastName,
        position,
        nickname,
        phoneNumber,
      },
    });
  }
}
