import './search.css';

type Props = {
  onClick: () => void;
};

export default function Search({ onClick }: Props) {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('text', event.target.value.trim());
  };
  return (
    <div className="top-container">
      <input
        className="input"
        defaultValue={localStorage.getItem('text') ?? ''}
        onChange={onInputChange}
        placeholder="Start your search"
      ></input>
      <button onClick={onClick}> Search </button>
    </div>
  );
}
