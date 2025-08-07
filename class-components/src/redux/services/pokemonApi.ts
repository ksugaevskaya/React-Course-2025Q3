import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { DetailedPokemon, FullPokemon } from '../../api/api';
import fetchPokemons, { fetchPokemonById } from '../../api/api';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getPokemons: builder.query<
      { data: FullPokemon[]; pages: number },
      { searchQuery?: string; page?: number }
    >({
      async queryFn({ searchQuery = '', page = 1 }) {
        try {
          const result = await fetchPokemons(searchQuery, page);
          return { data: result };
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: 'Fetch failed',
              data: String(error),
            },
          };
        }
      },
    }),

    getPokemonById: builder.query<DetailedPokemon, number>({
      async queryFn(id: number) {
        try {
          const result = await fetchPokemonById(id);
          return { data: result };
        } catch (error) {
          return {
            error: {
              status: 500,
              statusText: 'Fetch failed',
              data: String(error),
            },
          };
        }
      },
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonByIdQuery } = pokemonApi;
