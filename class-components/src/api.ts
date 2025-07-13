type Pokemon = {
  name: string;
  url: string;
};

type PokemonDetails = {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
};

type PokemonSpecies = {
  flavor_text_entries: FlavorTextEntry[];
};

type FlavorTextEntry = {
  flavor_text: string;
  language: {
    name: string;
  };
};

type FullPokemon = {
  name: string;
  image: string;
  description: string;
};

export default async function fetchPokemons(
  searchQuery: string = '',
  limit: number = 20
): Promise<FullPokemon[]> {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  const speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  try {
    const response = await fetch(`${apiUrl}?limit=1000`);
    const data: { results: Pokemon[] } = await response.json();

    const filtered = data.results
      .filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, limit);

    const detailedPokemons: FullPokemon[] = await Promise.all(
      filtered.map(async (pokemon: Pokemon) => {
        const pokemonDetailsRes = await fetch(pokemon.url);
        const pokemonDetails: PokemonDetails = await pokemonDetailsRes.json();

        const speciesRes = await fetch(`${speciesUrl}/${pokemonDetails.id}`);
        const speciesData: PokemonSpecies = await speciesRes.json();

        const descriptionEntry = speciesData.flavor_text_entries.find(
          (entry: FlavorTextEntry) => entry.language.name === 'en'
        );
        const description = descriptionEntry
          ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ')
          : 'No description available.';

        return {
          name: pokemonDetails.name,
          image: pokemonDetails.sprites.front_default,
          description,
        };
      })
    );

    return detailedPokemons;
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
}
