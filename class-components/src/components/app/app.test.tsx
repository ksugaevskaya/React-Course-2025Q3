import { cleanup, render, screen, waitFor } from '@testing-library/react';
import App from './App';
import { afterEach, expect, test, vitest } from 'vitest';

afterEach(cleanup);

vitest.mock('../../api/api', () => {
  return {
    default: vitest.fn().mockResolvedValue([
      {
        name: 'bulbasaur',
        image: 'https://example.com/bulbasaur.png',
        description: 'A strange seed was planted on its back at birth.',
      },
    ]),
  };
});

test('check correct rendering', async () => {
  const { container } = render(<App></App>);

  await waitFor(() => expect(screen.queryByText(/bulbasaur/i)).not.toBeNull());

  expect(container).toMatchSnapshot();
});
