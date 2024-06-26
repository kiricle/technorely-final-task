import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { Auth } from './auth/decorators/auth.decorator';
import { CurrentUser } from './auth/decorators/user.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Auth()
  getHello(@CurrentUser('id') id) {
    return this.appService.getHello(id);
  }
}
