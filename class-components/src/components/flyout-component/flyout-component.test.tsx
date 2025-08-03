import { Provider } from 'react-redux';
import FlyOutComponent from './flyout-component';
import { store } from '../../redux/store';
import { fireEvent, render, screen } from '@testing-library/react';
import { expect, test, vitest } from 'vitest';
import Pokemon from '../pokemon/pokemon';
import '@testing-library/jest-dom';

test('check correct FlyOutComponent rendering', () => {
  const { container } = render(
    <Provider store={store}>
      <FlyOutComponent></FlyOutComponent>
    </Provider>
  );

  expect(container).toMatchSnapshot();

  expect(screen.queryByText('Unselect all'));
  expect(screen.queryByText('Download'));
});

test('check Unselect all button functionality', () => {
  render(
    <Provider store={store}>
      <Pokemon
        id={1}
        url="https//:google.com/1"
        name="Pikachu"
        image="https//:google.com/imgage"
        description="yellow pokemon"
      ></Pokemon>
      <FlyOutComponent></FlyOutComponent>
    </Provider>
  );
  expect(screen.getByTestId('checkbox')).not.toBeChecked();

  fireEvent.click(screen.getByTestId('checkbox'));
  expect(screen.getByTestId('checkbox')).toBeChecked();

  fireEvent.click(screen.getByText('Unselect all'));
  expect(screen.getByTestId('checkbox')).not.toBeChecked();
});

test('check Download button pressability', () => {
  const createObjectURLMock = vitest.fn(() => 'blob:http://fake-url.com');
  URL.createObjectURL = createObjectURLMock;

  render(
    <Provider store={store}>
      <Pokemon
        id={1}
        url="https//:google.com/1"
        name="Pikachu"
        image="https//:google.com/imgage"
        description="yellow pokemon"
      ></Pokemon>
      <FlyOutComponent></FlyOutComponent>
    </Provider>
  );
  expect(screen.getByTestId('checkbox')).not.toBeChecked();

  fireEvent.click(screen.getByTestId('checkbox'));
  expect(screen.getByTestId('checkbox')).toBeChecked();

  fireEvent.click(screen.getByText('Download'));
});
