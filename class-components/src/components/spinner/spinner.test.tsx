import { render, screen } from '@testing-library/react';
import Spinner from './spinner';
import { expect, test } from 'vitest';

test('check spinner loading', () => {
  render(<Spinner></Spinner>);

  expect(screen).toMatchSnapshot();
});
