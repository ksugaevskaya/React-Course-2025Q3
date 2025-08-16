import './pokemon.css';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { select, unselect } from '../../redux/slices/selected-pokemon-slice';
import Image from 'next/image';

type Props = {
  name: string;
  image: string;
  description: string;
  url: string;
  id: number;
};

export default function Pokemon({ name, image, description, id, url }: Props) {
  const dispatch = useDispatch();
  const ids = useSelector((state: RootState) => state.selectedPokemon.ids);

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  const handleChange = () => {
    if (ids.includes(id)) {
      dispatch(unselect(id));
    } else {
      dispatch(select({ id, description, url }));
    }
  };
  return (
    <div className="pokemon-container">
      <Image width={96} height={96} alt="pokemon image" src={image}></Image>
      <div className="pokemon-text-container">
        <h2 className="h2"> {name} </h2>
        <span className="pokemon-description">{description}</span>
      </div>
      <div className="checkbox">
        <input
          onChange={handleChange}
          onClick={handleClick}
          className="custom-checkbox"
          data-testid="checkbox"
          type="checkbox"
          checked={ids.includes(id)}
        ></input>
      </div>
    </div>
  );
}
