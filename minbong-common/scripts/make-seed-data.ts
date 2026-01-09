import { DownloadDataInfo, Lang, SeedLangMap } from '../src/types/domain.ts';
import { DOWNLOAD_DATA_INFO } from '../src/store/sheetInfo.ts'
import path from 'path';
import fs from 'fs';
import Papa from 'papaparse';
import {
  buildContentsFromSheetRows,
  csvUrlToRowData,
  toExportCsvUrl,
} from '../src/utils/google-sheet/parsingUtils.ts';

(async() => {
  try {
    console.log ('🚀 Generating seed JSON from sheets...');
    await makeSeedData ();
    console.log ('✅ Seed JSON generation completed');
    process.exit (0);
  } catch (err) {
    console.error ('❌ Seed generation failed', err);
    process.exit (1);
  }
}) ();


export async function sheetToJson (
  info: DownloadDataInfo
): Promise<SeedLangMap> {

  const {
    sheetUrl,
    columnIndexesInfo,
    startRowIndex,
    maxRows,
    wrapTwiceAt,
  } = info;

  const csvUrl = toExportCsvUrl(sheetUrl);

  const rows = await csvUrlToRowData(csvUrl);

  const result: SeedLangMap = {};

  const langs = Object.keys(columnIndexesInfo) as Lang[];

  for (const lang of langs) {
    const columnIndexes = columnIndexesInfo[lang];
    if (!columnIndexes?.length) continue;

    const contents = buildContentsFromSheetRows(rows, {
      columnIndexes,
      startRowIndex,
      maxRows,
      wrapTwiceAt,
    });

    result[lang] = contents.map(c => ({ content: c }));
  }

  return result;
}

async function writeSeedJsonToFile (
  info: DownloadDataInfo
) {
  const langMap = await sheetToJson(info);

  const json = {
    category: {
      key: info.categoryNameKey,
      toggleYn: info.categoryToggleYn,
    },
    words: langMap,
  };

  const outputDir = path.resolve(process.cwd(), 'seed/json');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(
    outputDir,
    `${info.categoryNameKey}.json`
  );

  fs.writeFileSync(
    filePath,
    JSON.stringify(json, null, 2),
    'utf-8'
  );

  console.log(`✅ Seed JSON generated: ${filePath}`);
}

async function makeSeedData () {
  for (const downloadDataInfo of DOWNLOAD_DATA_INFO) {
    await writeSeedJsonToFile(downloadDataInfo);
  }
}
