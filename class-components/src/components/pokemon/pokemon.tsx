import { useState } from 'react';
import './pokemon.css';

type Props = {
  name: string;
  image: string;
  description: string;
};

export default function Pokemon({ name, image, description }: Props) {
  const [checkbox, setCheckbox] = useState(false);
  const handleClick = (e) => {
    checkbox ? setCheckbox(false) : setCheckbox(true);
    e.stopPropagation();
  };
  return (
    <div className="pokemon-container">
      <img src={image}></img>
      <div className="pokemon-text-container">
        <h2 className="h2"> {name} </h2>
        <span className="pokemon-description">{description}</span>
      </div>
      <div className="checkbox">
        <input
          onClick={handleClick}
          className="custom-checkbox"
          type="checkbox"
          checked={checkbox}
        ></input>
      </div>
    </div>
  );
}
