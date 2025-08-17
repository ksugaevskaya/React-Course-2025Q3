'use client';

import './details.css';
import Pokemon from '../../components/pokemon/pokemon';
import Spinner from '../../components/spinner/spinner';
import { useGetPokemonByIdQuery } from '../../redux/services/pokemonApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
            <Image
              alt="pokemon image"
              width={350}
              height={350}
              className="details-img"
              src={image}
            />
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

type DetailsPageProps = {
  pokemonId: string;
};

export default function DetailsPage({ pokemonId }: DetailsPageProps) {
  const router = useRouter();
  const { data: pokemon, isLoading: isSpinnerActive } = useGetPokemonByIdQuery(
    Number(pokemonId),
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: 60 * 5,
    }
  );

  const close = () => {
    router.back();
  };

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
