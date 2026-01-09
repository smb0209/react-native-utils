import {DownloadDataInfo} from '../types/domain.ts';

//@ts-ignore
export const DOWNLOAD_DATA_INFO: DownloadDataInfo[] = [
  {
    sheetUrl: 'https://docs.google.com/spreadsheets/d/your-sheet/',
    categoryNameKey: 'your-key-for-translate-key',
    columnIndexesInfo: {
      'ko': [0, 1, 2, 3],
      'ja': [0, 1, 4, 5],
      'en': [0, 1],
    },
    startRowIndex: 1,
    maxRows: 2000,
    wrapTwiceAt: [],
    categoryToggleYn: 'N'
  },
  {
    sheetUrl: 'https://docs.google.com/spreadsheets/d/your-sheet/',
    categoryNameKey: 'your-key-for-translate-key',
    columnIndexesInfo: {
      'ko': [0, 1, 2, 3],
      'ja': [0, 1, 4, 5],
      'en': [0, 1],
    },
    startRowIndex: 1,
    maxRows: 2000,
    wrapTwiceAt: [],
    categoryToggleYn: 'N'
  }
];
