import './search.css';
import useSearchQuery from '../../hooks/useSearchQuery';
import { useTranslations } from 'next-intl';

type Props = {
  onClick: () => void;
};

export default function Search({ onClick }: Props) {
  const [set, get] = useSearchQuery();
  const t = useTranslations('MainPage');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set(event.target.value.trim());
  };
  return (
    <div className="top-container">
      <input
        className="input"
        defaultValue={get()}
        onChange={onInputChange}
        placeholder={t('placeholder')}
      ></input>
      <button onClick={onClick}> {t('search')} </button>
    </div>
  );
}
