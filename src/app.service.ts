import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    console.log(process.env.NODE_ENV, 'TEST');
    return 'Hello World!';
  }
}
