import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

/*
The controller handles HTTP requests and responses.

✅ What it does:

Maps routes (endpoints)

Calls services

Returns data to clients

Connects the outside world to your app
*/

