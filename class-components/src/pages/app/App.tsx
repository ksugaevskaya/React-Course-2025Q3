import './App.css';
import Search from '../../components/search/search-component';
import Spinner from '../../components/spinner/spinner';
import PokemonList from '../../components/pokemon-list/pokemon-list-component';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import useSearchQuery from '../../hooks/useSearchQuery';
import FlyOutComponent from '../../components/flyout-component/flyout-component';
import { useGetPokemonsQuery } from '../../redux/services/pokemonApi';

export default function App() {
  const [, get] = useSearchQuery();
  const { pageId } = useParams();
  const [searchQuery, setSearchQuery] = useState(get());
  const {
    data: pokemonArray,
    error: isErrorActive,
    isLoading: isSpinnerActive,
  } = useGetPokemonsQuery({ searchQuery, page: Number(pageId) });

  const isValidPageId = /^\d+$/.test(pageId || '');

  const handleClick = async () => {
    setSearchQuery(get());
  };

  if (pageId !== undefined && !isValidPageId) {
    return <Navigate to="/not-found" replace />;
  }

  return (
    <>
      <Link to="/about" className="navigation">
        About
      </Link>
      <Search onClick={handleClick}></Search>
      {isSpinnerActive ? <Spinner></Spinner> : null}{' '}
      {pokemonArray?.data.length === 0 ? (
        <div className="message">
          No Pokemons found. Please try a new search.
        </div>
      ) : null}
      {isErrorActive ? (
        <div className="message">
          Failed to render Pokemons. Please try again.
        </div>
      ) : (
        <PokemonList pokemonArray={pokemonArray?.data || []}></PokemonList>
      )}
      {pokemonArray?.data.length !== 0 ? (
        <div className="bottom-container">
          {new Array(pokemonArray?.pages).fill(1).map((_, i) => (
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
      <div>
        <FlyOutComponent></FlyOutComponent>
      </div>
    </>
  );
}
