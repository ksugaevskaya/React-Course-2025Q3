import { Link } from 'react-router';
import PokemonComponent from '../pokemon/pokemon';

type Props = {
  pokemonArray: {
    id: number;
    name: string;
    image: string;
    description: string;
  }[];
};

export default function PokemonList({ pokemonArray }: Props) {
  return pokemonArray.map((pokemon) => (
    <Link
      key={pokemon.name}
      to={{
        pathname: `${pokemon.id}`,
      }}
    >
      <PokemonComponent
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        image={pokemon.image}
        description={pokemon.description}
      ></PokemonComponent>
    </Link>
  ));
}
