import './App.css';
import Search from '../../components/search/search-component';
import fetchPokemons from '../../api/api';
import Spinner from '../../components/spinner/spinner';
import PokemonList from '../../components/pokemon-list/pokemon-list-component';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import useSearchQuery from '../../hooks/useSearchQuery';

type Pokemon = {
  id: number;
  name: string;
  image: string;
  description: string;
};

export default function App() {
  const [isSpinnerActive, setSpinner] = useState(false);
  const [pokemonArray, setPokemonArray] = useState<Pokemon[]>([]);
  const [isErrorActive, setError] = useState(false);
  const [page, setPage] = useState(1);

  const { pageId } = useParams();

  useEffect(() => {
    handleClick();
  }, [pageId]);

  const [, get] = useSearchQuery();

  const handleClick = async () => {
    console.log("Hello, I'm pokemon");
    setSpinner(true);
    try {
      const allPokemons = await fetchPokemons(get(), Number(pageId));
      setPage(allPokemons.pages);
      setPokemonArray(allPokemons.data);
      setSpinner(false);
      setError(false);
    } catch {
      setError(true);
      setSpinner(false);
    }
  };

  return (
    <>
      <Link to="/about" className="navigation">
        About
      </Link>
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
      {pokemonArray.length !== 0 ? (
        <div className="bottom-container">
          {new Array(page).fill(1).map((_, i) => (
            <Link
              key={i + 1}
              to={{
                pathname: `/${i + 1}`,
              }}
            >
              <div className="pagination"> {i + 1} </div>
            </Link>
          ))}
        </div>
      ) : null}
    </>
  );
}
