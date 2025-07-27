import '@testing-library/jest-dom';
import { cleanup, render, screen } from '@testing-library/react';
import { Details } from './details';
import { afterEach, expect, test } from 'vitest';

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
