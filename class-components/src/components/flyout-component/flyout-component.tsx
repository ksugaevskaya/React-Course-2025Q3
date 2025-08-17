import { useDispatch, useSelector } from 'react-redux';
import './flyout-component.css';
import type { RootState } from '../../redux/store';
import { unselectAll } from '../../redux/slices/selected-pokemon-slice';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';

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

export default function FlyOutComponent() {
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const dispatch = useDispatch();
  const ids = useSelector((state: RootState) => state.selectedPokemon.ids);
  const csv = useSelector((state: RootState) => state.selectedPokemon.csv);
  const handleClick = () => {
    dispatch(unselectAll());
  };
  const handleDownload = () => {
    if (!csv || csv.length === 0) return;

    const csvContent = convertToCSV(csv);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const fileName = `${csv.length}_items.csv`;

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = fileName;
      downloadLinkRef.current.click();
    }
  };

  const t = useTranslations('SelectButton');

  return (
    <>
      <div className={`flyout ${ids.length >= 1 ? 'show' : 'hide'}`}>
        {' '}
        <span className="bn-text">
          {t('select')}: {ids.length}
        </span>{' '}
        <button onClick={handleClick} className="bn-text">
          {' '}
          {t('all')}{' '}
        </button>
        <button className="bn-text" onClick={handleDownload}>
          {' '}
          {t('download')}{' '}
        </button>
        <a ref={downloadLinkRef} className="hidden">
          Hidden download link
        </a>
      </div>
    </>
  );
}
