import './pokemon.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { select, unselect } from '../../redux/slices/selected-pokemon-slice';

type Props = {
  name: string;
  image: string;
  description: string;
  id: number;
};

export default function Pokemon({ name, image, description, id }: Props) {
  const dispatch = useDispatch();
  const ids = useSelector((state: RootState) => state.selectedPokemon.ids);

  const handleClick = (e) => {
    e.stopPropagation();
  };
  const handleChange = (e) => {
    ids.includes(id) ? dispatch(unselect(id)) : dispatch(select(id));
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
          onChange={handleChange}
          onClick={handleClick}
          className="custom-checkbox"
          type="checkbox"
          checked={ids.includes(id)}
        ></input>
      </div>
    </div>
  );
}
