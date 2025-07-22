import { expect, test, vitest } from 'vitest';
import fetchPokemons from './api';

vitest.spyOn(console, 'error').mockImplementation(() => {});

const mockFetch = vitest.fn();

globalThis.fetch = mockFetch;

const mockPokemonList = {
  results: [
    { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ],
};

const mockPokemonDetails = {
  id: 1,
  name: 'bulbasaur',
  sprites: {
    front_default: 'https://example.com/bulbasaur.png',
  },
};

const mockPokemonSpecies = {
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted on its back at birth.',
      language: { name: 'en' },
    },
  ],
};

test('fetches and maps full Pokemon data', async () => {
  mockFetch
    .mockResolvedValueOnce({
      json: async () => mockPokemonList,
    })
    .mockResolvedValueOnce({
      json: async () => mockPokemonDetails,
    })
    .mockResolvedValueOnce({
      json: async () => mockPokemonSpecies,
    });

  const result = await fetchPokemons('bulb', 1);

  expect(result).toEqual([
    {
      name: 'bulbasaur',
      image: 'https://example.com/bulbasaur.png',
      description: 'A strange seed was planted on its back at birth.',
    },
  ]);

  expect(mockFetch).toHaveBeenCalledTimes(3);
});

test('returns empty array for unmatched query', async () => {
  mockFetch.mockResolvedValueOnce({
    json: async () => mockPokemonList,
  });

  const result = await fetchPokemons('pikachu');
  expect(result).toEqual([]);
});

test('throws on fetch error', async () => {
  mockFetch.mockRejectedValueOnce(new Error('Network error'));

  const promise = fetchPokemons();

  await expect(promise).rejects.toThrow('Network error');
});
