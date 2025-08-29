import './search.css';
import { useState } from 'react';

type Props = {
  onClick: (value: string) => void;
};

export default function Search({ onClick }: Props) {
  const [value, setValue] = useState('');
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value.trim());
  };
  return (
    <div className="top-container">
      <input
        className="input"
        value={value}
        onChange={onInputChange}
        placeholder="Start your search"
      ></input>
      <button onClick={() => onClick(value)}> Search </button>
    </div>
  );
}
