import { useNavigate, useParams } from 'react-router';
import './details.css';
import { useEffect, useState } from 'react';
import { fetchPokemonById } from '../../api/api';
import Pokemon from '../../components/pokemon/pokemon';
import Spinner from '../../components/spinner/spinner';

type Pokemon = {
  name: string;
  image: string;
  description: string;
  experience: number;
  weight: number;
  height: number;
  types: string;
};

export function Details({
  name,
  image,
  description,
  experience,
  weight,
  height,
  types,
}: Pokemon) {
  return (
    <>
      <div>
        <div className="pokemon-details-container">
          <div>
            <img className="details-img" src={image} />
          </div>
          <div className="pokemon-details-text-container">
            <h2 className="h2"> {name.toUpperCase()} </h2>
            <h3 className="h3">
              Description:
              <i>{description}</i>
            </h3>
            <h3 className="h3"> Base experience: {experience}</h3>
            <h3 className="h3"> Weight: {weight}</h3>
            <h3 className="h3"> Height: {height} </h3>
            <h3 className="h3"> Types: {types}</h3>
          </div>
        </div>
      </div>
    </>
  );
}

export default function DetailsPage() {
  const { pokemonId } = useParams();
  const navigate = useNavigate();

  const [isSpinnerActive, setSpinner] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();

  const close = () => {
    navigate('..');
  };

  const handleUpdate = async () => {
    setSpinner(true);
    const showPokenom = await fetchPokemonById(Number(pokemonId));
    setSpinner(false);
    setPokemon(showPokenom);
  };

  useEffect(() => {
    handleUpdate();
  }, [pokemonId]);

  return (
    <div className="main-container">
      {isSpinnerActive ? (
        <Spinner></Spinner>
      ) : (
        <>
          <Details
            image={pokemon ? pokemon.image : ' '}
            name={pokemon ? pokemon.name : ' '}
            description={pokemon ? pokemon.description : ' '}
            experience={pokemon ? pokemon.experience : NaN}
            weight={pokemon ? pokemon.weight : NaN}
            height={pokemon ? pokemon.height : NaN}
            types={pokemon ? pokemon.types : ''}
          ></Details>
          <div className="close-button">
            <button onClick={close}>Close </button>
          </div>
        </>
      )}
    </div>
  );
}
