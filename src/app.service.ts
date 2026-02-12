import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

/*
The service contains your business logic.

✅ What it does:

Handles data processing

Calls database

Performs calculations

Returns results to controllers
*/

