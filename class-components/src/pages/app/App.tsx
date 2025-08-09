import './App.css';
import Search from '../../components/search/search-component';
import Spinner from '../../components/spinner/spinner';
import PokemonList from '../../components/pokemon-list/pokemon-list-component';
import { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import useSearchQuery from '../../hooks/useSearchQuery';
import FlyOutComponent from '../../components/flyout-component/flyout-component';
import {
  pokemonApi,
  useGetPokemonsQuery,
} from '../../redux/services/pokemonApi';
import { useDispatch } from 'react-redux';

export default function App() {
  const [, get] = useSearchQuery();
  const { pageId } = useParams();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(get());
  const {
    data: pokemonArray,
    error: isErrorActive,
    isLoading: isSpinnerActive,
  } = useGetPokemonsQuery(
    { searchQuery, page: Number(pageId) },
    {
      refetchOnFocus: true,
      refetchOnReconnect: true,
      refetchOnMountOrArgChange: 60 * 5,
    }
  );

  const isValidPageId = /^\d+$/.test(pageId || '');

  const handleClick = async () => {
    setSearchQuery(get());
  };

  const handleInvalidateCache = () => {
    dispatch(pokemonApi.util.resetApiState());
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
      <button onClick={handleInvalidateCache}>Invalidate ALL Cache</button>
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
