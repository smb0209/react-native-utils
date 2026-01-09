export type Lang = 'ko' | 'en' | 'ja';

export const LANGUAGES: { label: string; value: string; }[] = [
  { label: 'English', value: 'en' },
  { label: '한국어', value: 'ko' },
  { label: '日本語', value: 'ja' },
];

export type ProAction = () => void | Promise<void>;

export type ProActionContextType = {
  runProAction: (action: ProAction) => Promise<void>;
};

export type DownloadDataInfo = {
  sheetUrl: string;
  categoryNameKey: string;
  categoryName?: string;
  columnIndexesInfo: {
    [key: string]: number[];
  };
  columnIndexes?: number[];
  startRowIndex: number;
  maxRows: number;
  wrapTwiceAt: number[];
  categoryToggleYn: 'N' | 'Y';
};

export type SeedLangMap = Partial<Record<Lang, { content: string }[]>>;
