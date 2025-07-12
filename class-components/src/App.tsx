import { Component } from 'react';

import './App.css';
import Search from './search-component';
import PokemonComponent from './pokemon';
import fetchPokemons from './api';
import Spinner from './spinner';

type Pokemon = {
  name: string;
  image: string;
  description: string;
};

type AppState = {
  isSpinnerActive: boolean;
  pokemonArray: Pokemon[];
};
class App extends Component<unknown, AppState> {
  state: AppState = {
    isSpinnerActive: false,
    pokemonArray: [],
  };

  componentDidMount(): void {
    this.handleClick();
  }

  handleClick = async () => {
    console.log("Hello, I'm pokemon");
    this.setState({ isSpinnerActive: true });
    const allPokemons = await fetchPokemons(localStorage.getItem('text') ?? '');
    this.setState({ pokemonArray: allPokemons });
    this.setState({ isSpinnerActive: false });
  };

  render() {
    return (
      <>
        <Search onClick={this.handleClick}></Search>
        {this.state.isSpinnerActive ? <Spinner></Spinner> : null}
        {this.state.pokemonArray.map((pokemon) => (
          <PokemonComponent
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.image}
            description={pokemon.description}
          ></PokemonComponent>
        ))}
      </>
    );
  }
}

export default App;
