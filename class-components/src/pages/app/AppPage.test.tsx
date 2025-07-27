import AppPage from './AppPage';
import { render } from '@testing-library/react';
import { expect, test, vitest } from 'vitest';

vitest.mock('./App', () => ({
  default: 'App',
}));

vitest.mock('react-router', () => ({
  Outlet: 'Outlet',
}));

test('check AppPAge component rendering', () => {
  const { container } = render(<AppPage></AppPage>);

  expect(container).toMatchSnapshot();
});
