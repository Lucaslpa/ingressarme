import { promises as fs } from 'fs';
const path = require('path');
import { Client } from 'pg';

export class StartDatabase {
  constructor(protected readonly client: Client) {}

  public async Eexecute() {
    try {
      await this.createTables();
      console.log('Create tables executed with success');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  private async createTables() {
    const query = await this.loadSQLFile('create_tables.sql');
    await this.client.connect();
    await this.client.query(query);
    this.client.end();
  }

  private async loadSQLFile(fileName: string): Promise<string> {
    console.log(__dirname);
    const filePath = path.join(__dirname, '../sql', fileName);
    return fs.readFile(filePath, 'utf-8');
  }
}
