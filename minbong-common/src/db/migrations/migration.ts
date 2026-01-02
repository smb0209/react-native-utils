import {executeSelectOne, getDB} from '@/db/client';

/**
 * Initial schema + safe patches
 */
export async function migrate() {
  const db = await getDB();

  console.info('🟡 migrate: open db');

  db.execute(`
	  CREATE TABLE IF NOT EXISTS app_meta
	  (
		  key
		  TEXT
		  PRIMARY
		  KEY,
		  value
		  TEXT
		  NOT
		  NULL
	  );
  `);

  db.execute(`
	  INSERT
	  OR IGNORE INTO app_meta (key, value)
      VALUES ('total_launches', '0');
  `);

  /* ===============================
   * PATCH 001:
   * player_preference.current_index
   * =============================== */
  const patchCheck = executeSelectOne<{ value: string }>(
    db,
    `SELECT value
	 FROM app_meta
	 WHERE key = ?`,
    ['your-unique-patch-key-200012312310'],
  );

  if (!patchCheck) {
    // write your patch to DB
    db.execute(`
		INSERT INTO app_meta (key, value)
		VALUES ('your-unique-patch-key-200012312310', 'done')
    `);
  }
}
