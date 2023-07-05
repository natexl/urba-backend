import { Pool, QueryResult } from 'pg';
import databaseConfig from "@/config/database"

const pool = new Pool(databaseConfig);

const query = async (text: string, params?: any[]): Promise<QueryResult> => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('Executed query', { text, duration, rows: res.rowCount });
  return res;
};

export default {
  query,
};