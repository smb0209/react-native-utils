// parsing `sheet url` to `csv-export url`
import Papa from 'papaparse';

export function toExportCsvUrl (sheetUrl: string) {
  const idMatch = sheetUrl.match (/spreadsheets\/d\/([^/]+)/);
  const gidMatch = sheetUrl.match (/[?&#]gid=(\d+)/);
  if ( !idMatch) {
    return sheetUrl;
  } // fallback
  const id = idMatch[1];
  const gid = gidMatch?.[1] ?? '0';
  return `https://docs.google.com/spreadsheets/d/${id}/export?format=csv&gid=${gid}`;
}

// parsing data from `csv-export url` with options
export async function csvUrlToRowData (csvUrl: string) {
  
  const res = await fetch (csvUrl);
  
  if ( !res.ok) {
    throw new Error (`Failed to fetch CSV: ${res.status}`);
  }
  
  const csvText = (await res.text ()).replace (/^\uFEFF/, '');
  
  const parsed = Papa.parse<string[]> (csvText);
  if (parsed.errors?.length) {
    throw new Error (parsed.errors[0].message);
  }
  
  return parsed.data ?? [];
}

// sheet-row data processing with options
export function buildContentsFromSheetRows (
  rows: string[][],
  options: {
    columnIndexes: number[];
    startRowIndex: number;
    maxRows: number;
    wrapTwiceAt: number[];
  },
): string[] {
  const {
    columnIndexes,
    startRowIndex,
    maxRows,
    wrapTwiceAt,
  } = options;
  
  const values: string[] = [];
  
  for (let r = startRowIndex; r < rows.length; r ++) {
    const row = rows[r];
    if ( !row) continue;
    
    const raw = columnIndexes
      .map ((col, idx, arr) => {
        const cell = (row[col] ?? '').toString ();
        
        if (
          wrapTwiceAt.includes (idx) &&
          arr.length > 1 &&
          idx !== arr.length - 1 &&
          cell
        ) {
          return cell + '\n';
        }
        return cell;
      })
      .join ('\n');
    
    const content = raw.trim ();
    if ( !content) continue;
    
    values.push (content);
    
    if (maxRows && values.length >= maxRows) {
      break;
    }
  }
  
  return values;
}
