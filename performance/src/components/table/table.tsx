import type { Row } from '../../api/api';

type Props = {
  nameDir: string;
  changeSort: () => void;
  fields: (keyof Row)[];
  visibleRows: Row[];
  query: string;
};

export default function Table({
  nameDir,
  changeSort,
  fields,
  visibleRows,
  query,
}: Props) {
  return (
    <div className="main-table-container">
      <table className="table-container">
        <thead className="thead">
          <tr>
            <th className="th">
              <button
                className="th-sort"
                onClick={changeSort}
                aria-sort={nameDir === 'asc' ? 'ascending' : 'descending'}
                title={`Sort by name (${nameDir === 'asc' ? 'A→Z' : 'Z→A'})`}
              >
                Name{' '}
                <span className="caret">{nameDir === 'asc' ? '▲' : '▼'}</span>
              </button>
            </th>
            <th className="th">ISO Code</th>
            <th className="th">Year</th>
            <th className="th">Population</th>
            <th className="th">CO2</th>
            <th className="th">CO2 Per Capita</th>
            {fields.map((string) => (
              <th className="th" key={string}>
                {string}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((r) => (
            <tr key={r.iso}>
              <td className="td-left">{r.name}</td>
              <td className="td">{r.iso}</td>
              <td className="td">{r.year}</td>
              <td className="td-right">{r.population ?? ''}</td>
              <td className="td-right">{r.co2 ?? ''}</td>
              <td className="td-right">{r.co2PerCapita ?? ''}</td>
              {fields.map((string) => (
                <td className="td-right" key={string}>
                  {r[string]}
                </td>
              ))}
            </tr>
          ))}

          {visibleRows.length === 0 && (
            <tr>
              <td className="td-left" colSpan={6}>
                No countries match “{query}”.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
