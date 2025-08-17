'use server';

type CsvRow = {
  id: number;
  description: string;
  url: string;
};

function convertToCSV(items: CsvRow[]): string {
  if (items.length === 0) return '';

  const headers = ['id', 'description', 'url'];
  const rows = items.map((item) =>
    [item.id, item.description.replaceAll(',', ''), item.url].join(',')
  );

  return [headers.join(','), ...rows].join('\n');
}

export async function compileCsvAction(rows: CsvRow[]) {
  const csv = convertToCSV(rows);
  return { csv, filename: `${rows.length}_items.csv` };
}
