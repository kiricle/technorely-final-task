import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/auth.dto';
import { SignInDto } from './dto/sign-in.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly jwt: JwtService,
  ) {}

  async signUp(dto: SignUpDto) {
    const isEmailInUse = await this.userService.getByEmail(dto.email);

    if (isEmailInUse) throw new BadRequestException('This email is used');

    const isNicknameInUse = await this.userService.getByNickname(dto.nickname);

    if (isNicknameInUse) throw new BadRequestException('This nickname is used');

    const isPhoneInUse = await this.userService.getByPhoneNumber(
      dto.phoneNumber,
    );

    if (isPhoneInUse)
      throw new BadRequestException('This phone number is used');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...user } = await this.userService.create(dto);

    const accessToken = await this.createToken(user.id);

    return { user, accessToken };
  }

  async signIn(dto: SignInDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hash, ...user } = await this.userService.validateUser(dto);

    const accessToken = await this.createToken(user.id);

    return {
      user,
      accessToken,
    };
  }

  createToken(id: string) {
    const data = { id };

    return this.jwt.signAsync(data, {
      expiresIn: '1d',
    });
  }
}
