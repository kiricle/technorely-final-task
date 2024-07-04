import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { CompanyModule } from './company/company.module';

@Module({
  imports: [AuthModule, ConfigModule.forRoot(), UserModule, CompanyModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
