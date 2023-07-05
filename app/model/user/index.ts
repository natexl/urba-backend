import db from '@/utils/database';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: number;
  username: string;
  password: string;
  last_time: string
}

const getUsers = async (): Promise<User[]> => {
  const res = await db.query('SELECT * FROM users');
  return res.rows as User[];
};

const getUserById = async (id: number): Promise<User | undefined> => {
  const res = await db.query('SELECT * FROM users WHERE id = $1', [id]);
  return res.rows[0] as User | undefined;
};

const getUserByName = async (username: string): Promise<User | undefined> => {
    const res = await db.query('SELECT * FROM users WHERE username = $1', [username]);
    return res.rows[0] as User | undefined;
  };

const createUser = async (username: string, password: string): Promise<User> => {
  let date = new Date(Date.now())
  let strNow = date.toISOString()
  let id = uuidv4()
  const res = await db.query('INSERT INTO users (id, username, password, create_time) VALUES ($1, $2, $3, $4) RETURNING *', [id, username, password, strNow]);
  return res.rows[0] as User;
};

const updateUser = async (user: User): Promise<User> => {
    const {username, password, last_time, id} = user
    const res = await db.query('UPDATE users SET username = $1, password = $2, last_time = $3 WHERE id = $4 RETURNING *', [username, password, last_time, id]);
  return res.rows[0] as User;
};

const deleteUser = async (id: number): Promise<number> => {
  const res = await db.query('DELETE FROM users WHERE id = $1', [id]);
  return res.rowCount;
};

export {
  getUsers,
  getUserById,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
};