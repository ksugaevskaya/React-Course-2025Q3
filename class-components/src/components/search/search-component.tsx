import './search.css';
import useSearchQuery from '../../hooks/useSearchQuery';

type Props = {
  onClick: () => void;
};

export default function Search({ onClick }: Props) {
  const [set, get] = useSearchQuery();
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    set(event.target.value.trim());
  };
  return (
    <div className="top-container">
      <input
        className="input"
        defaultValue={get()}
        onChange={onInputChange}
        placeholder="Start your search"
      ></input>
      <button onClick={onClick}> Search </button>
    </div>
  );
}
