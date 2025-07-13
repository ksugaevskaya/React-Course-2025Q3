type Pokemon = {
  name: string;
  url: string;
};

type FullPokemon = {};

export default async function fetchPokemons(searchQuery = '', limit = 20) {
  const apiUrl = 'https://pokeapi.co/api/v2/pokemon';
  const speciesUrl = 'https://pokeapi.co/api/v2/pokemon-species';

  try {
    const response = await fetch(`${apiUrl}?limit=1000`);
    const data = await response.json();

    const filtered = data.results
      .filter((pokemon: Pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, limit);

    const detailedPokemons = await Promise.all(
      filtered.map(async (pokemon: Pokemon) => {
        const pokemonDetailsRes = await fetch(pokemon.url);
        const pokemonDetails = await pokemonDetailsRes.json();

        const speciesRes = await fetch(`${speciesUrl}/${pokemonDetails.id}`);
        const speciesData = await speciesRes.json();

        const descriptionEntry = speciesData.flavor_text_entries.find(
          (entry) => entry.language.name === 'en'
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
