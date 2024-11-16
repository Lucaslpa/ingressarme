// firebase.module.ts
import { Module, OnModuleInit } from '@nestjs/common';
import { Database } from '@infra';

@Module({})
export class DatabaseModule implements OnModuleInit {
  onModuleInit() {
    const database = new Database();
    database.buildDatabaseInfra();
  }
}
