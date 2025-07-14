import { Component } from 'react';
import PokemonComponent from '../pokemon/pokemon';

type Props = {
  pokemonArray: {
    name: string;
    image: string;
    description: string;
  }[];
};

export default class PokemonList extends Component<Props> {
  render() {
    return this.props.pokemonArray.map((pokemon) => (
      <PokemonComponent
        key={pokemon.name}
        name={pokemon.name}
        image={pokemon.image}
        description={pokemon.description}
      ></PokemonComponent>
    ));
  }
}
