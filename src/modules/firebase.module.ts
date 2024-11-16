// firebase.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { FirebaseConfig } from '../infra/FirebaseConfig';

@Module({})
export class FirebaseModule implements OnModuleInit {
  onModuleInit() {
    FirebaseConfig.Start();
  }
}
