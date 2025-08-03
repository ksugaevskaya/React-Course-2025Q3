import { beforeEach, expect, test, vitest } from 'vitest';
import fetchPokemons, { fetchPokemonById } from './api';

vitest.spyOn(console, 'error').mockImplementation(() => {});

const mockFetch = vitest.fn();

globalThis.fetch = mockFetch;

beforeEach(() => {
  mockFetch.mockClear();
});

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

  expect(result).toEqual({
    data: [
      {
        id: 1,
        url: 'https://pokeapi.co/api/v2/pokemon-species/1',
        name: 'bulbasaur',
        image: 'https://example.com/bulbasaur.png',
        description: 'A strange seed was planted on its back at birth.',
      },
    ],
    pages: 1,
  });

  expect(mockFetch).toHaveBeenCalledTimes(3);
});

test('returns empty array for unmatched query', async () => {
  mockFetch.mockResolvedValueOnce({
    json: async () => mockPokemonList,
  });

  const result = await fetchPokemons('pikachu');
  expect(result).toEqual({ data: [], pages: 0 });
});

test('throws on fetch error', async () => {
  mockFetch.mockRejectedValueOnce(new Error('Network error'));

  const promise = fetchPokemons();

  await expect(promise).rejects.toThrow('Network error');
});

const mockDetailsResponse = {
  name: 'bulbasaur',
  base_experience: 64,
  weight: 69,
  height: 7,
  sprites: {
    other: {
      home: {
        front_default: 'https://example.com/bulbasaur-home.png',
      },
    },
  },
  types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
};

const mockSpeciesResponse = {
  flavor_text_entries: [
    {
      flavor_text: 'A strange seed was planted on its back at birth.',
      language: { name: 'en' },
    },
  ],
};

test('fetchPokemonById returns detailed Pokemon data', async () => {
  mockFetch
    .mockResolvedValueOnce({ ok: true, json: async () => mockDetailsResponse })
    .mockResolvedValueOnce({ ok: true, json: async () => mockSpeciesResponse });

  const result = await fetchPokemonById(1);

  expect(result).toEqual({
    name: 'bulbasaur',
    description: 'A strange seed was planted on its back at birth.',
    image: 'https://example.com/bulbasaur-home.png',
    experience: 64,
    weight: 69,
    height: 7,
    types: 'grass, poison',
  });

  expect(mockFetch).toHaveBeenCalledTimes(2);
  expect(mockFetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon/1');
  expect(mockFetch).toHaveBeenCalledWith(
    'https://pokeapi.co/api/v2/pokemon-species/1'
  );
});

test('fetchPokemonById handles missing English description', async () => {
  mockFetch
    .mockResolvedValueOnce({ ok: true, json: async () => mockDetailsResponse })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => ({ flavor_text_entries: [] }),
    });

  const result = await fetchPokemonById(1);

  expect(result.description).toBe('No description available.');
});

test('fetchPokemonById throws error when API fails', async () => {
  mockFetch
    .mockResolvedValueOnce({ ok: false })
    .mockResolvedValueOnce({ ok: true, json: async () => mockSpeciesResponse });

  await expect(fetchPokemonById(1)).rejects.toThrow(
    'Failed to fetch Pokemon data.'
  );
});

test('fetchPokemonById throws on network error', async () => {
  mockFetch.mockRejectedValueOnce(new Error('Network down'));

  await expect(fetchPokemonById(1)).rejects.toThrow('Network down');
});
