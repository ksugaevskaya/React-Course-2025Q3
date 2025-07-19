import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import ErrorBoundary from './error-boundary';

import { afterEach, expect, test } from 'vitest';
import { Component, type ReactNode } from 'react';

afterEach(cleanup);

test('check renderring children if no error', () => {
  const { container } = render(
    <ErrorBoundary>
      <h1>Hello, world</h1>
    </ErrorBoundary>
  );

  expect(screen.queryByText('Hello, world')).not.toBeNull();
  expect(container).toMatchSnapshot();
});

class ErrorComponent extends Component {
  render(): ReactNode {
    throw new Error('test error');

    return null;
  }
}

test('check showing error if children have error', () => {
  render(
    <ErrorBoundary>
      <ErrorComponent></ErrorComponent>
    </ErrorBoundary>
  );

  expect(screen.queryByText('Oops... Something went wrong...')).not.toBeNull();
});

test('check if error button was clicked', () => {
  render(
    <ErrorBoundary>
      <ErrorComponent></ErrorComponent>
    </ErrorBoundary>
  );

  fireEvent.click(screen.getByText('Try again'));
});
