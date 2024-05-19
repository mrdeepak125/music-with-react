import { openDB } from 'idb';

const DB_NAME = 'musicDB';
const STORE_NAME = 'songs';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    },
  });
  return db;
};

export const saveSong = async (song) => {
  const db = await initDB();
  await db.put(STORE_NAME, song);
};

export const getSongs = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

export const deleteSong = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
