import { Client } from 'pg';
import { StartDatabase } from './StartDatabase';
import { promises as fs } from 'fs';
const path = require('path');

export class Database {
  private client: Client = new Client({
    user: process.env.SQL_USER,
    host: process.env.SQL_HOST,
    database: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: Number(process.env.SQL_PORT),
  });

  async buildDatabaseInfra() {
    const startDatabase = new StartDatabase(this.client);
    await startDatabase.Eexecute();
  }

  async connect() {
    try {
      await this.client.connect();
      console.log('Conectado ao banco de dados!');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  }

  async disconnect() {
    try {
      await this.client.end();
      console.log('Desconectado do banco de dados.');
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  }

  async query(query: string, values: any[] = []): Promise<any> {
    try {
      const result = await this.client.query(query, values);
      return result.rows;
    } catch (error) {
      console.error('Erro ao executar query:', error);
      throw error;
    }
  }
}
