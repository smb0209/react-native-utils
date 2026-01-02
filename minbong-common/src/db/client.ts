import { open } from 'react-native-quick-sqlite';

export type DBLike = {
  execute: (query: string, params?: any[]) => {
    rows?: {
      length: number;
      item: (idx: number) => any;
    };
  };
};

export type QueryResultRows = {
  length: number;
  item: (idx: number) => any;
};

export type ExecuteResult = {
  rows: QueryResultRows;
};


export async function getDB() {
  return open ({
    name: 'your-name.db',
    location: 'default',
  });
}

export function rowsToArray<T>(rows: QueryResultRows): T[] {
  const result: T[] = [];
  for (let i = 0; i < rows.length; i++) {
    result.push(rows.item(i) as T);
  }
  return result;
}

export function firstRow<T>(rows: QueryResultRows): T | null {
  if (!rows || rows.length === 0) {
    return null;
  }
  return rows.item(0) as T;
}
export function executeSelectAll<T>(
  db: DBLike,
  query: string,
  params?: any[]
): T[] {
  const result = db.execute(query, params);

  if (!result?.rows) {
    return [];
  }

  return rowsToArray<T>(result.rows);
}

export function executeSelectOne<T>(
  db: DBLike,
  query: string,
  params?: any[]
): T | null {
  const result = db.execute(query, params);

  if (!result?.rows) {
    return null;
  }

  return firstRow<T>(result.rows);
}
