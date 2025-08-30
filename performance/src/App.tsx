import React, { Suspense, useState } from 'react';
import { getCO2RowsLatest, type Row } from './api/api';
import './App.css';
import wrapPromise from './resource';
import Search from './components/search/search';
import Select from './components/select/select';
import { filterRowsByName, sortRowsByName, type SortDir } from './utils/filter';

const rowsResource = wrapPromise(getCO2RowsLatest());

function CO2TableInner() {
  const rows: Row[] = rowsResource.read();

  const [query, setQuery] = useState('');
  const [nameDir, setNameDir] = useState<SortDir>('asc');

  const filtered = filterRowsByName(rows, query);
  const visibleRows = sortRowsByName(filtered, nameDir);

  return (
    <div className="main-container">
      <h2 className="h2">CO₂ emissions — per country (latest year)</h2>
      <Search onClick={setQuery} />
      <Select />
      <div className="main-table-container">
        <table className="table-container">
          <thead className="thead">
            <tr>
              <th className="th">
                <button
                  className="th-sort"
                  onClick={() =>
                    setNameDir((d) => (d === 'asc' ? 'desc' : 'asc'))
                  }
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
      <p className="p">
        Source: Our World in Data — CO₂ &amp; Greenhouse Gas Emissions.
      </p>
    </div>
  );
}

export default function CO2Table() {
  return (
    <Suspense fallback={<div className="loading">Loading…</div>}>
      <CO2TableInner />
    </Suspense>
  );
}
