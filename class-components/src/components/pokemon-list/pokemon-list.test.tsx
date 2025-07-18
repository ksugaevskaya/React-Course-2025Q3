import { render, screen } from '@testing-library/react';
import PokemonList from './pokemon-list-component';

import { expect, test } from 'vitest';

test('correct pokemon list rendering', () => {
  render(
    <PokemonList
      pokemonArray={[
        {
          name: 'Pikachu',
          image: 'https//google.com/image',
          description: 'yellow pokemon',
        },
      ]}
    ></PokemonList>
  );

  expect(screen.queryByText('Pikachu')).not.toBeNull();
  expect(screen.queryByText('yellow pokemon')).not.toBeNull();

  expect(screen).toMatchSnapshot();
});
