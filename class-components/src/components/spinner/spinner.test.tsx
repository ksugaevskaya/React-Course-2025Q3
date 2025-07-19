import { render } from '@testing-library/react';
import Spinner from './spinner';
import { expect, test } from 'vitest';

test('check spinner loading', () => {
  const { container } = render(<Spinner></Spinner>);

  expect(container).toMatchSnapshot();
});
