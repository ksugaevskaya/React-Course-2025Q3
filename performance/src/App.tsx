import React, { Suspense, useCallback, useState } from 'react';
import { getCO2RowsLatest, type Row } from './api/api';
import './App.css';
import wrapPromise from './resource';
import Search from './components/search/search';
import Select from './components/select/select';
import { filterRowsByName, sortRowsByName, type SortDir } from './utils/filter';
import Columns from './components/additional-columns/columns';
import Table from './components/table/table';

const rowsResource = wrapPromise(getCO2RowsLatest());

function CO2TableInner() {
  const rows: Row[] = rowsResource.read();

  const [fields, setFields] = useState<(keyof Row)[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [query, setQuery] = useState('');
  const [nameDir, setNameDir] = useState<SortDir>('asc');

  const filtered = filterRowsByName(rows, query);
  const visibleRows = sortRowsByName(filtered, nameDir);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, []);
  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);
  const changeSort = useCallback(
    () => setNameDir((d) => (d === 'asc' ? 'desc' : 'asc')),
    []
  );

  return (
    <div className="main-container">
      <h2 className="h2">CO₂ emissions — per country (latest year)</h2>
      <Search onClick={setQuery} />
      <Select />
      <button onClick={openModal}>Open Modal</button>
      <Columns
        visible={showModal}
        onClose={closeModal}
        onConfirm={setFields}
      ></Columns>
      <Table
        nameDir={nameDir}
        changeSort={changeSort}
        fields={fields}
        visibleRows={visibleRows}
        query={query}
      ></Table>
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
