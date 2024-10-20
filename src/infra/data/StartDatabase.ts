import { Client, Pool } from 'pg';
import { loadSQLFile } from '../loadSql';
import { ECategoriesArray, ETicketTierArray } from '@business';
import { ETiersColors } from '@business';

export class StartDatabase {
  constructor(protected readonly client: Pool) {}

  public async Eexecute() {
    try {
      await this.createTables();
      await this.seedTables();
      console.log('Create tables executed with success');
    } catch (error) {
      console.error('Error creating tables:', error);
    }
  }

  private async createTables() {
    const query = await loadSQLFile('create_tables.sql');

    await this.client.query(query);
  }

  private async seedTables() {
    const categories = ECategoriesArray;
    const tiers = ETicketTierArray;

    const queryInsertCategories = `INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING`;

    try {
      for (const category of categories) {
        await this.client.query(queryInsertCategories, [category]);
      }
    } catch (error) {
      console.error('Error inserting categories:', error);
    }

    const queryInsertTiers = `INSERT INTO Tiers (name, color) VALUES ($1, $2) ON CONFLICT (name, color) DO NOTHING`;

    try {
      for (const tier of tiers) {
        await this.client.query(queryInsertTiers, [tier, ETiersColors[tier]]);
      }
    } catch (error) {
      console.error('Error inserting tiers:', error);
    }
  }
}
