import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pokemon from './pokemon';

import { expect, test } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

test('correct pokemon rendering', () => {
  const { container } = render(
    <Provider store={store}>
      <Pokemon
        id={1}
        url="https//:google.com/1"
        name="Pikachu"
        image="https//:google.com/imgage"
        description="yellow pokemon"
      ></Pokemon>
    </Provider>
  );
  expect(screen.queryByText('Pikachu')).not.toBeNull();
  expect(screen.queryByText('yellow pokemon')).not.toBeNull();

  expect(container).toMatchSnapshot();
});

test('correct checkbox functionality', () => {
  render(
    <Provider store={store}>
      <Pokemon
        id={1}
        url="https//:google.com/1"
        name="Pikachu"
        image="https//:google.com/imgage"
        description="yellow pokemon"
      ></Pokemon>
    </Provider>
  );

  expect(screen.getByTestId('checkbox')).not.toBeChecked();

  fireEvent.click(screen.getByTestId('checkbox'));
  expect(screen.getByTestId('checkbox')).toBeChecked();

  fireEvent.click(screen.getByTestId('checkbox'));
  expect(screen.getByTestId('checkbox')).not.toBeChecked();
});
