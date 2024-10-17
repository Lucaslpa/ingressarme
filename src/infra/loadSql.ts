import { promises as fs } from 'fs';
const path = require('path');

export function loadSQLFile(fileName: string): Promise<string> {
  const filePath = path.join(__dirname, '/sql', fileName);
  return fs.readFile(filePath, 'utf-8');
}
