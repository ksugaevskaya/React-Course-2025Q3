import { useDispatch, useSelector } from 'react-redux';
import './flyout-component.css';
import type { RootState } from '../../redux/store';
import { unselectAll } from '../../redux/slices/selected-pokemon-slice';
import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { compileCsvAction } from '../../app/actions/exportCsv';

export default function FlyOutComponent() {
  const downloadLinkRef = useRef<HTMLAnchorElement | null>(null);
  const dispatch = useDispatch();
  const ids = useSelector((state: RootState) => state.selectedPokemon.ids);
  const csv = useSelector((state: RootState) => state.selectedPokemon.csv);
  const handleClick = () => {
    dispatch(unselectAll());
  };
  const handleDownload = async () => {
    if (!csv || csv.length === 0) return;

    const csvContent = await compileCsvAction(csv);
    const blob = new Blob([csvContent.csv], {
      type: 'text/csv;charset=utf-8;',
    });
    const url = URL.createObjectURL(blob);

    if (downloadLinkRef.current) {
      downloadLinkRef.current.href = url;
      downloadLinkRef.current.download = csvContent.filename;
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
