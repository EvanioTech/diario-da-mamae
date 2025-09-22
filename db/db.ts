import { openDatabaseSync, type SQLiteDatabase } from "expo-sqlite";

export const db: SQLiteDatabase = openDatabaseSync("diarioMamae_v2.db");

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
      data TEXT NOT NULL,
      descricao TEXT,
      imagemUri TEXT
    );
  `);

  // Se tabela já existia sem as colunas, tente adicioná-las — evita que quebre pra quem já tem app
  // Da pra checar colunas ou simplesmente tentar ADD COLUMN com try/catch
  await db.execAsync(`ALTER TABLE evento ADD COLUMN descricao TEXT;`)
    .catch((e) => { /* silenciar se já existir */ });
  await db.execAsync(`ALTER TABLE evento ADD COLUMN imagemUri TEXT;`)
    .catch((e) => { /* silenciar se já existir */ });
};

// Funções auxiliares
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

// App functions

// inserir evento “genérico”
export const addEvento = async (key_evento: string) => {
  const data = new Date().toISOString();
  try {
    const result = await db.runAsync(
      'INSERT INTO evento (key_evento, data) VALUES (?, ?);',
      [key_evento, data]
    );
    return result.changes;
  } catch (error) {
    console.log('Erro ao registrar evento:', error);
    throw error;
  }
};

// inserir coco com imagem possivelmente
export const addEventoCoco = async (
  descricao: string,
  imagemUri: string | null
) => {
  const data = new Date().toISOString();
  try {
    const result = await db.runAsync(
      `INSERT INTO evento (key_evento, data, descricao, imagemUri) VALUES (?, ?, ?, ?);`,
      ['Coco', data, descricao, imagemUri]
    );
    return result.changes;
  } catch (error) {
    console.log("Erro ao inserir evento Coco:", error);
    throw error;
  }
};

// pegar todos eventos
export const getAllEventos = async (): Promise<any[]> => {
  try {
    const result = await db.getAllAsync('SELECT * FROM evento ORDER BY data DESC');
    return result;
  } catch (error) {
    console.error('Erro ao buscar eventos:', error);
    return [];
  }
};

// pegar só eventos de Coco
export const getEventosCoco = async (): Promise<
  { id: number; key_evento: string; data: string; descricao: string | null; imagemUri: string | null }[]
> => {
  try {
    const rows: any[] = await db.getAllAsync(
      `SELECT id, key_evento, data, descricao, imagemUri FROM evento WHERE key_evento = ? ORDER BY data DESC;`,
      ['Coco']
    );
    return rows;
  } catch (error) {
    console.error('Erro ao buscar eventos Coco:', error);
    return [];
  }
};

export const updateEventoCoco = async (
  id: number,
  newDescricao: string,
  newImagemUri: string | null
) => {
  try {
    await db.runAsync(
      `UPDATE evento SET descricao = ?, imagemUri = ? WHERE id = ?;`,
      [newDescricao, newImagemUri, id]
    );
  } catch (error) {
    console.error("Erro ao atualizar evento Coco:", error);
    throw error;
  }
};

export const deleteEvento = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM evento WHERE id = ?;', [id]);
  } catch (e) {
    console.error('Erro ao excluir evento:', e);
    throw e;
  }
};

export const updateEvento = async (id: number, newKeyEvento: string) => {
  try {
    await db.runAsync(
      `UPDATE evento SET key_evento = ? WHERE id = ?;`,
      [newKeyEvento, id]
    );
  } catch (error) {
    console.error("Erro ao atualizar evento:", error);
    throw error;
  }
};
