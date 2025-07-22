import PokemonComponent from '../pokemon/pokemon';

type Props = {
  pokemonArray: {
    name: string;
    image: string;
    description: string;
  }[];
};

export default function PokemonList({ pokemonArray }: Props) {
  return pokemonArray.map((pokemon) => (
    <PokemonComponent
      key={pokemon.name}
      name={pokemon.name}
      image={pokemon.image}
      description={pokemon.description}
    ></PokemonComponent>
  ));
}
