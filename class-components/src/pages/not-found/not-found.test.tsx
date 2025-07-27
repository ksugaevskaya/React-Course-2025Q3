import { render, screen } from '@testing-library/react';
import NotFound from './not-found-component';
import { expect, test } from 'vitest';

test('check not-found component rendering', () => {
  const { container } = render(<NotFound></NotFound>);
  expect(container).toMatchSnapshot();
  expect(screen.queryByText('404 Not found')).not.toBeNull();
});
