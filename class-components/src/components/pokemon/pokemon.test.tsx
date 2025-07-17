import { render, screen } from '@testing-library/react';
import Pokemon from './pokemon';

import { expect, test } from 'vitest';

test('correct pokemon rendering', () => {
  render(
    <Pokemon
      name="Pikachu"
      image="https//:google.com/imgage"
      description="Blalal bka bla bla"
    ></Pokemon>
  );
  expect(screen.queryByText('Pikachu')).toBeDefined();
  expect(screen.queryByText('Blalal bka bla bla')).toBeDefined();

  expect(screen).toMatchSnapshot();
});
