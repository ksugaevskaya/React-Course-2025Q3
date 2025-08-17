import PokemonComponent from '../pokemon/pokemon';
import { Link } from '../../i18n/navigation';
import { useSearchParams } from 'next/navigation';

type Props = {
  pokemonArray: {
    id: number;
    url: string;
    name: string;
    image: string;
    description: string;
  }[];
};

export default function PokemonList({ pokemonArray }: Props) {
  const searchParams = useSearchParams();
  const params = searchParams?.toString();

  return pokemonArray.map((pokemon) => (
    <Link
      key={pokemon.id}
      href={params ? `/${pokemon.id}?${params}` : `/${pokemon.id}`}
    >
      <PokemonComponent
        key={pokemon.id}
        id={pokemon.id}
        name={pokemon.name}
        url={pokemon.url}
        image={pokemon.image}
        description={pokemon.description}
      ></PokemonComponent>
    </Link>
  ));
}
