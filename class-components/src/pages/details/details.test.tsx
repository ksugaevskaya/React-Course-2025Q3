import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import DetailsPage, { Details } from './details';
import { afterEach, beforeEach, expect, test, vitest } from 'vitest';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';
import { pokemonApi } from '../../redux/services/pokemonApi';

afterEach(cleanup);

beforeEach(() => {
  store.dispatch(pokemonApi.util.resetApiState());
});

test('check detail component rendering', () => {
  const { container } = render(
    <Details
      name="Pikachu"
      image="https:/image.com"
      description="yellow pokemon"
      experience={29}
      weight={20}
      height={20}
      types="electricity"
    ></Details>
  );

  expect(container).toMatchSnapshot();
  expect(screen.queryByText('PIKACHU')).not.toBeNull();
  expect(screen.queryByText('yellow pokemon')).not.toBeNull();
  expect(screen.queryByText('Base experience: 29')).not.toBeNull();
  expect(screen.queryByText('Weight: 20')).not.toBeNull();
  expect(screen.queryByText('Height: 20')).not.toBeNull();
  expect(screen.queryByText('Types: electricity')).not.toBeNull();
});

const mockedFetchPokemonFn = vitest.fn();

vitest.mock('../../api/api', () => ({
  fetchPokemonById: () => mockedFetchPokemonFn(),
}));

const mockedNavigate = vitest.fn();

vitest.mock('react-router', async () => {
  const actual =
    await vitest.importActual<typeof import('react-router')>('react-router');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

test('check page rendering', async () => {
  mockedFetchPokemonFn.mockResolvedValue({
    name: 'Raichu',
    description:
      'Its long tail serves as a ground to protect itself from its own high-voltage power',
    image: 'https:/google.com',
    experience: 218,
    weight: 300,
    height: 8,
    types: 'electric',
  });
  const { container } = render(
    <MemoryRouter>
      <Provider store={store}>
        <DetailsPage></DetailsPage>
      </Provider>
    </MemoryRouter>
  );

  expect(container).toMatchSnapshot();
  await waitFor(() => {
    expect(screen.queryByText('Close')).not.toBeNull();
  });
  expect(screen.queryByText('RAICHU')).not.toBeNull();
  expect(
    screen.queryByText(
      'Its long tail serves as a ground to protect itself from its own high-voltage power'
    )
  ).not.toBeNull();
  expect(screen.queryByText('Base experience: 218')).not.toBeNull();
  expect(screen.queryByText('Weight: 300')).not.toBeNull();
  expect(screen.queryByText('Height: 8')).not.toBeNull();
  expect(screen.queryByText('Types: electric')).not.toBeNull();
});

test('check if the close button clicked', async () => {
  render(
    <MemoryRouter>
      <Provider store={store}>
        <DetailsPage></DetailsPage>
      </Provider>
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.queryByText('Close')).not.toBeNull());
  fireEvent.click(screen.getByText('Close'));

  expect(mockedNavigate).toHaveBeenCalledWith('..');
});
