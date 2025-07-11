import { Component, useState } from 'react';

import './App.css';
import Search from './search-component';
import Pokemon from './pokemon';

class App extends Component {
  state = {
    pokemonArray: [
      {
        name: 'Pikachu',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png',
        description:
          'When several of these POKéMON gather, their electricity could build and cause lightning storms.',
      },
      {
        name: 'Bulbazawr',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
        description:
          'When several of these POKéMON gather, their bulbazawr power could build and cause bulba growth.',
      },
      {
        name: 'Ivizawr',
        image:
          'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
        description:
          'When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.',
      },
    ],
  };

  handleClick = () => {
    console.log("Hello, I'm pokemon");
  };

  render() {
    return (
      <>
        <Search onClick={this.handleClick}></Search>
        {this.state.pokemonArray.map((pokemon) => (
          <Pokemon
            key={pokemon.name}
            name={pokemon.name}
            image={pokemon.image}
            description={pokemon.description}
          ></Pokemon>
        ))}
      </>
    );
  }
}

export default App;
