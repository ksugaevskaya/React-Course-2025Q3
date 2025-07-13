import { Component } from 'react';

import './App.css';
import Search from './search-component';
import fetchPokemons from './api';
import Spinner from './spinner';
import PokemonList from './pokemon-list-component';

type Pokemon = {
  name: string;
  image: string;
  description: string;
};

type AppState = {
  isErrorActive: boolean;
  isSpinnerActive: boolean;
  pokemonArray: Pokemon[];
};
class App extends Component<unknown, AppState> {
  state: AppState = {
    isSpinnerActive: false,
    pokemonArray: [],
    isErrorActive: false,
  };

  componentDidMount(): void {
    this.handleClick();
  }

  handleClick = async () => {
    console.log("Hello, I'm pokemon");
    this.setState({ isSpinnerActive: true });
    try {
      const allPokemons = await fetchPokemons(
        localStorage.getItem('text') ?? ''
      );
      this.setState({ pokemonArray: allPokemons });
      this.setState({ isSpinnerActive: false });
      this.setState({ isErrorActive: false });
    } catch {
      this.setState({ isErrorActive: true });
      this.setState({ isSpinnerActive: false });
    }
  };

  render() {
    return (
      <>
        <Search onClick={this.handleClick}></Search>
        {this.state.pokemonArray.length === 0
          ? 'No Pokemons found. Please try a new search.'
          : null}
        {this.state.isSpinnerActive ? <Spinner></Spinner> : null}
        {this.state.isErrorActive ? (
          'Failed to render Pokemons. Please try again.'
        ) : (
          <PokemonList pokemonArray={this.state.pokemonArray}></PokemonList>
        )}
      </>
    );
  }
}

export default App;
