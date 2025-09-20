import { openDatabaseSync, type SQLiteDatabase } from "expo-sqlite";

export const db: SQLiteDatabase = openDatabaseSync("diarioMamae_v1.db");

// Criar tabelas e garantir usuário admin
export const initDB = async () => {
  await db.execAsync(`
    PRAGMA foreign_keys = ON;

    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      senha TEXT NOT NULL,
      babyName TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS evento (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key_evento TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `);
};

// ---- Funções de Ajuda ----
export const runAsync = async (sql: string, params: any[] = []) => {
  return db.runAsync(sql, params);
};

export const getFirstAsync = async <T = any>(
  sql: string,
  params: any[] = []
): Promise<T | null> => {
  const result = await db.getFirstAsync<T>(sql, params);
  return result ?? null;
};

// ---- Funções para o App ----
// Função para inserir um usuário
export const addUser = async (email: string, senha: string, babyName: string) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO users (name, email, senha, babyName) VALUES (?,  ?, ?, ?);',
      [name, email, senha, babyName]
    );
    console.log('Usuário registrado:', result);
    return result.changes;
  } catch (error) {
    console.log('Erro ao registrar usuário:', error);
    throw error;
  }
};

// Função para inserir um evento
export const addEvento = async (key_evento: string) => {
  const data = new Date().toISOString();
  try {
    const result = await db.runAsync(
      'INSERT INTO evento (key_evento, data) VALUES (?, ?);',
      [key_evento, data]
    );
    console.log('Evento registrado:', result);
    return result.changes;
  } catch (error) {
    console.log('Erro ao registrar evento:', error);
    throw error;
  }
};