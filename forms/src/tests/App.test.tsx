import { render } from '@testing-library/react';
import App from '../App';
import { expect, test, vitest } from 'vitest';

vitest.mock('react-redux', () => ({
  useSelector: vitest
    .fn()
    .mockReturnValue({ controlled: null, uncontrolled: null }),
}));

test('App renders', () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});
