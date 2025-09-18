// db.ts
import * as SQLite from 'expo-sqlite';

// Abrir/Cria o banco de dados
const db = SQLite.openDatabase('diarioMamae.db');

// Inicializa o banco de dados e cria as tabelas se não existirem
export const initDB = () => {
  db.transaction(tx => {
    // Tabela para armazenar usuários
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        senha TEXT NOT NULL,
        nome_bebe TEXT NOT NULL,
        sexo TEXT CHECK(sexo IN ('masculino','feminino')) NOT NULL
      );`
    );

    // Tabela para armazenar eventos selecionados no modal
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS evento (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key_evento TEXT NOT NULL,
        data TEXT NOT NULL
      );`
    );
  });
};

// Função para inserir um evento
export const addEvento = (key_evento: string) => {
  const data = new Date().toISOString();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO evento (key_evento, data) VALUES (?, ?);',
      [key_evento, data],
      (_, result) => {
        console.log('Evento registrado:', result);
      },
      (_, error) => {
        console.log('Erro ao registrar evento:', error);
        return false;
      }
    );
  });
};

// Função para inserir um usuário
export const addUser = (email: string, senha: string, nome_bebe: string, sexo: 'masculino' | 'feminino') => {
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO user (email, senha, nome_bebe, sexo) VALUES (?, ?, ?, ?);',
      [email, senha, nome_bebe, sexo],
      (_, result) => console.log('Usuário registrado:', result),
      (_, error) => {
        console.log('Erro ao registrar usuário:', error);
        return false;
      }
    );
  });
};

// Exporta o db para consultas futuras
export default db;
