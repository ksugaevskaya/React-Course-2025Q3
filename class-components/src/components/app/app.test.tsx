import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vitest } from 'vitest';

let mockedApiFn = vitest.fn();

vitest.mock('../../api/api', () => ({
  default: () => mockedApiFn(),
}));

import App from './App';

afterEach(() => {
  cleanup();
  mockedApiFn.mockReset();
});

test('displays no results message when data array is empty', async () => {
  mockedApiFn.mockResolvedValue([]);
  render(<App></App>);

  await waitFor(() =>
    expect(
      screen.queryByText('No Pokemons found. Please try a new search.')
    ).not.toBeNull()
  );
});

test('check correct rendering', async () => {
  mockedApiFn.mockResolvedValue([
    {
      name: 'bulbasaur',
      image: 'https://example.com/bulbasaur.png',
      description: 'A strange seed was planted on its back at birth.',
    },
  ]);
  const { container } = render(<App></App>);

  await waitFor(() => expect(screen.queryByText(/bulbasaur/i)).not.toBeNull());

  expect(container).toMatchSnapshot();
});

test('check making initial API call on component mount', async () => {
  const apiSpy = vitest.fn().mockResolvedValue([]);
  mockedApiFn = apiSpy;
  render(<App></App>);

  await waitFor(() => expect(apiSpy).toBeCalledTimes(1));
});

test('show error message if api failed', async () => {
  mockedApiFn.mockRejectedValue('Error!');
  render(<App></App>);

  await waitFor(() =>
    expect(
      screen.queryAllByText('Failed to render Pokemons. Please try again.')
    ).not.toBeNull()
  );
});
