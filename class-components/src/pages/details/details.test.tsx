import '@testing-library/jest-dom';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import DetailsPage, { Details } from './details';
import { afterEach, expect, test, vitest } from 'vitest';
import { MemoryRouter } from 'react-router';

afterEach(cleanup);

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

let mockedFetchPokemonFn = vitest.fn();

vitest.mock('../../api/api', () => ({
  fetchPokemonById: () => mockedFetchPokemonFn(),
}));

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
      <DetailsPage></DetailsPage>
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
      <DetailsPage></DetailsPage>
    </MemoryRouter>
  );
  await waitFor(() => expect(screen.queryByText('Close')).not.toBeNull());
  fireEvent.click(screen.getByText('Close'));
});
