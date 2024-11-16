import { Client, Pool } from 'pg';
import { StartDatabase } from './StartDatabase';

export class Database {
  private pool: Pool = new Pool({
    user: process.env.SQL_USER,
    host: process.env.SQL_HOST,
    database: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    port: Number(process.env.SQL_PORT),
  });

  async buildDatabaseInfra() {
    const startDatabase = new StartDatabase(this.pool);
    await startDatabase.Eexecute();
  }

  async connect() {
    try {
      await this.pool.connect();
      console.log('Conectado ao banco de dados!');
    } catch (error) {
      console.error('Erro ao conectar ao banco de dados:', error);
    }
  }

  async disconnect() {
    try {
      await this.pool.end();
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  }

  async query(query: string, values: any[] = []): Promise<any> {
    try {
      console.log('Executando query:', query, values);
      const result = await this.pool.query(query, values);

      return result.rows;
    } catch (error) {
      console.error('Erro ao executar query:', error);
      throw error;
    }
  }
}
