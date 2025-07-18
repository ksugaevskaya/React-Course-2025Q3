import { fireEvent, render, screen } from '@testing-library/react';
import Search from './search-component';
import { afterEach, expect, test, vitest } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(cleanup);

test('correct search rendering', () => {
  render(<Search onClick={vitest.fn()}></Search>);

  expect(screen.queryByPlaceholderText('Start your search')).not.toBeNull();
  expect(screen.queryByText('Search')).not.toBeNull();
  expect(screen).toMatchSnapshot();
});

test('check onClick functionality', () => {
  const onClick = vitest.fn();
  render(<Search onClick={onClick}></Search>);

  fireEvent.click(screen.getByText('Search'));

  expect(onClick).toHaveBeenCalled();
});
