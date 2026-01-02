// src/repositories/appMetaRepository.ts
import { getDB } from '@/db/client';

export async function getMeta (key: string): Promise<string | null> {
  const db = await getDB ();
  
  try {
    const res = db.execute (
      'SELECT value FROM app_meta WHERE key = ?',
      [key],
    );
    if ( !res?.rows?.length) {
      return null;
    }
    return res.rows.item (0).value;
  } catch (e) {
    console.error ('🔴 getMeta failed', e);
    return null;
  }
}

export async function setMeta (key: string, value: string): Promise<void> {
  const db = await getDB ();
  
  try {
    db.execute (
      `
          INSERT INTO app_meta (key, value)
          VALUES (?, ?)
          ON CONFLICT(key) DO UPDATE SET value = excluded.value
      `,
      [key, value],
    );
    
  } catch (e) {
    console.error ('🔴 setMeta failed', e);
  }
}
