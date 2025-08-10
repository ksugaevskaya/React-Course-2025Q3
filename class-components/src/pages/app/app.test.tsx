import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { afterEach, expect, test, vitest } from 'vitest';
import { MemoryRouter } from 'react-router';
import { configureStore } from '@reduxjs/toolkit';

let mockedApiFn = vitest.fn();

vitest.mock('../../api/api', () => ({
  default: () => mockedApiFn(),
}));

import App from './App';
import { Provider } from 'react-redux';
import { pokemonApi } from '../../redux/services/pokemonApi';
import selectedPokemonSlice from '../../redux/slices/selected-pokemon-slice';

const makeStore = () =>
  configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
      selectedPokemon: selectedPokemonSlice,
    },
    middleware: (gDM) => gDM().concat(pokemonApi.middleware),
  });

afterEach(() => {
  cleanup();
  mockedApiFn.mockReset();
});

test('displays no results message when data array is empty', async () => {
  mockedApiFn.mockResolvedValue({ data: [], pages: 0 });
  const store = makeStore();
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(
      screen.queryByText('No Pokemons found. Please try a new search.')
    ).not.toBeNull()
  );
});

test('check correct rendering', async () => {
  mockedApiFn.mockResolvedValue({
    data: [
      {
        name: 'bulbasaur',
        image: 'https://example.com/bulbasaur.png',
        description: 'A strange seed was planted on its back at birth.',
      },
    ],
    pages: 1,
  });
  const store = makeStore();
  const { container } = render(
    <MemoryRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() => expect(screen.queryByText(/bulbasaur/i)).not.toBeNull());

  expect(container).toMatchSnapshot();
});

test('check making initial API call on component mount', async () => {
  const apiSpy = vitest.fn().mockResolvedValue({ data: [], pages: 0 });
  mockedApiFn = apiSpy;
  const store = makeStore();
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() => expect(apiSpy).toBeCalledTimes(1));
});

test('show error message if api failed', async () => {
  mockedApiFn.mockRejectedValue('Error!');
  const store = makeStore();
  render(
    <MemoryRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() =>
    expect(
      screen.queryAllByText('Failed to render Pokemons. Please try again.')
    ).not.toBeNull()
  );
});

test('show spinner on initial mount', async () => {
  const store = makeStore();
  const { container } = render(
    <MemoryRouter>
      <Provider store={store}>
        <App></App>
      </Provider>
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(container).toMatchSnapshot();
  });
});
