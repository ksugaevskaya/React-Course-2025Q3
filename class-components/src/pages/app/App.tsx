import './App.css';
import Search from '../../components/search/search-component';
import Spinner from '../../components/spinner/spinner';
import PokemonList from '../../components/pokemon-list/pokemon-list-component';
import { useState } from 'react';
import useSearchQuery from '../../hooks/useSearchQuery';
import FlyOutComponent from '../../components/flyout-component/flyout-component';
import {
  pokemonApi,
  useGetPokemonsQuery,
} from '../../redux/services/pokemonApi';
import { useDispatch } from 'react-redux';
import Link from 'next/link';

export default function App() {
  const [, get] = useSearchQuery();
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState(get());
  const pageId = 1;
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

  const handleClick = async () => {
    setSearchQuery(get());
  };

  const handleInvalidateCache = () => {
    dispatch(pokemonApi.util.resetApiState());
  };

  return (
    <>
      <Link href="/about" className="navigation">
        About
      </Link>
      <Search onClick={handleClick}></Search>
      <button onClick={handleInvalidateCache}>Invalidate ALL Cache</button>
      {isSpinnerActive ? <Spinner></Spinner> : null}{' '}
      {!pokemonArray?.data.length ? (
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
            <div key={i} className="pagination">
              {' '}
              {i + 1}{' '}
            </div>
          ))}
        </div>
      ) : null}
      <div>
        <FlyOutComponent></FlyOutComponent>
      </div>
    </>
  );
}
