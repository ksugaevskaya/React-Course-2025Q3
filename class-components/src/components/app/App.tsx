import './App.css';
import Search from '../search/search-component';
import fetchPokemons from '../../api/api';
import Spinner from '../spinner/spinner';
import PokemonList from '../pokemon-list/pokemon-list-component';
import { useEffect, useState } from 'react';

type Pokemon = {
  name: string;
  image: string;
  description: string;
};

export default function App() {
  const [shouldThrow, setShouldThrow] = useState(false);
  const [isSpinnerActive, setSpinner] = useState(false);
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [isErrorActive, setError] = useState(false);

  useEffect(() => {
    handleClick();
  }, []);

  const handleClick = async () => {
    console.log("Hello, I'm pokemon");
    setSpinner(true);
    try {
      const allPokemons = await fetchPokemons(
        localStorage.getItem('text') ?? ''
      );
      setPokemonArray(allPokemons);
      setSpinner(false);
      setError(false);
    } catch {
      setError(true);
      setSpinner(false);
    }
  };

  const errorClick = () => {
    setShouldThrow(true);
  };

  if (shouldThrow) {
    throw new Error('Test error');
  }
  return (
    <>
      <Search onClick={handleClick}></Search>
      {isSpinnerActive ? <Spinner></Spinner> : null}{' '}
      {pokemonArray.length === 0 ? (
        <div className="message">
          No Pokemons found. Please try a new search.
        </div>
      ) : null}
      {isErrorActive ? (
        <div className="message">
          Failed to render Pokemons. Please try again.
        </div>
      ) : (
        <PokemonList pokemonArray={pokemonArray}></PokemonList>
      )}
      <div className="error-button">
        <button onClick={errorClick}>Error Button </button>
      </div>
    </>
  );
}
