import { fireEvent, render, screen } from '@testing-library/react';
import Search from './search-component';
import { afterEach, expect, test, vitest } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

test('correct search rendering', () => {
  const { container } = render(<Search onClick={vitest.fn()}></Search>);

  expect(screen.queryByPlaceholderText('Start your search')).not.toBeNull();
  expect(screen.queryByText('Search')).not.toBeNull();
  expect(container).toMatchSnapshot();
});

test('check onClick functionality', () => {
  const onClick = vitest.fn();
  render(<Search onClick={onClick}></Search>);

  fireEvent.click(screen.getByText('Search'));

  expect(onClick).toHaveBeenCalled();
});

test('check data saved to LS', () => {
  const onClick = vitest.fn();
  render(<Search onClick={onClick}></Search>);

  const input = screen.getByPlaceholderText('Start your search');

  fireEvent.change(input, { target: { value: 'Pikachu' } });
  expect(localStorage.getItem('text')).toBe('Pikachu');
});
