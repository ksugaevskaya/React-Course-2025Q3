import { render, screen } from '@testing-library/react';
import PokemonList from './pokemon-list-component';

import { expect, test, vitest } from 'vitest';
import { MemoryRouter } from 'react-router';

vitest.mock('react-redux', () => ({
  useSelector: vitest.fn().mockReturnValue([]),
  useDispatch: vitest.fn(),
}));

test('correct pokemon list rendering', () => {
  const { container } = render(
    <MemoryRouter>
      <PokemonList
        pokemonArray={[
          {
            id: 1,
            url: 'https//google.com/1',
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
