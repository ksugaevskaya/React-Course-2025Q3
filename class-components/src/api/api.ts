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
  id: number;
  name: string;
  image: string;
  description: string;
};
type DetailedPokemon = {
  name: string;
  description: string;
  image: string;
  experience: number;
  weight: number;
  height: number;
  types: string;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default async function fetchPokemons(
  searchQuery: string = '',
  limit: number = 20
): Promise<FullPokemon[]> {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  const speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  try {
    await delay(1000);

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
          id: pokemonDetails.id,
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

export async function fetchPokemonById(id: number): Promise<DetailedPokemon> {
  const detailsUrl = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const speciesUrl = `https://pokeapi.co/api/v2/pokemon-species/${id}`;

  try {
    await delay(2000);
    const [detailsRes, speciesRes] = await Promise.all([
      fetch(detailsUrl),
      fetch(speciesUrl),
    ]);

    if (!detailsRes.ok || !speciesRes.ok) {
      throw new Error('Failed to fetch Pokémon data.');
    }

    const detailsData = await detailsRes.json();
    const speciesData = await speciesRes.json();

    const descriptionEntry = speciesData.flavor_text_entries.find(
      (entry: FlavorTextEntry) => entry.language.name === 'en'
    );
    const description = descriptionEntry
      ? descriptionEntry.flavor_text.replace(/\n|\f/g, ' ')
      : 'No description available.';

    const types = detailsData.types
      .map((t: { type: { name: string } }) => t.type.name)
      .join(', ');

    return {
      name: detailsData.name,
      description,
      image: detailsData.sprites.other.home.front_default,
      experience: detailsData.base_experience,
      weight: detailsData.weight,
      height: detailsData.height,
      types,
    };
  } catch (error) {
    console.error(`Error fetching Pokémon with ID ${id}:`, error);
    throw error;
  }
}
