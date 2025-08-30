import type { Row } from '../api/api';

export function filterRowsByName(rows: Row[], query: string): Row[] {
  const q = query.trim().toLowerCase();
  if (!q) return rows;
  return rows.filter((r) => r.name.toLowerCase().includes(q));
}
export type SortDir = 'asc' | 'desc';

export function sortRowsByName(rows: Row[], dir: SortDir = 'asc'): Row[] {
  const collator = new Intl.Collator(undefined, {
    sensitivity: 'base',
    numeric: true,
  });
  const m = dir === 'asc' ? 1 : -1;
  return [...rows].sort((a, b) => m * collator.compare(a.name, b.name));
}
