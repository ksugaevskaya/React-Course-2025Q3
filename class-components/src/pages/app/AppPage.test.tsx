import AppPage from './AppPage';
import { render } from '@testing-library/react';
import { expect, test, vitest } from 'vitest';

vitest.mock('./App', () => ({
  default: () => <div>App</div>,
}));

vitest.mock('react-router', () => ({
  Outlet: () => <div>Outlet</div>,
}));

test('check AppPAge component rendering', () => {
  const { container } = render(<AppPage></AppPage>);

  expect(container).toMatchSnapshot();
});
