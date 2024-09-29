import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return process.env.FIREBASE_PRIVATE_KEY ?? 'Hellos World!';
  }
}
