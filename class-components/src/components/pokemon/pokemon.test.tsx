import { render, screen } from '@testing-library/react';
import Pokemon from './pokemon';

import { expect, test } from 'vitest';

test('correct pokemon rendering', () => {
  render(
    <Pokemon
      name="Pikachu"
      image="https//:google.com/imgage"
      description="yellow pokemon"
    ></Pokemon>
  );
  expect(screen.queryByText('Pikachu')).not.toBeNull();
  expect(screen.queryByText('yellow pokemon')).not.toBeNull();

  expect(screen).toMatchSnapshot();
});
