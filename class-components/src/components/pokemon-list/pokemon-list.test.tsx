import { render, screen } from '@testing-library/react';
import PokemonList from './pokemon-list-component';

import { expect, test } from 'vitest';
import { MemoryRouter } from 'react-router';

test('correct pokemon list rendering', () => {
  const { container } = render(
    <MemoryRouter>
      <PokemonList
        pokemonArray={[
          {
            id: 1,
            name: 'Pikachu',
            image: 'https//google.com/image',
            description: 'yellow pokemon',
          },
        ]}
      ></PokemonList>
    </MemoryRouter>
  );

  expect(screen.queryByText('Pikachu')).not.toBeNull();
  expect(screen.queryByText('yellow pokemon')).not.toBeNull();

  expect(container).toMatchSnapshot();
});
