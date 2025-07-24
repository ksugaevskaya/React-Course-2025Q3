import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import About from './about-component';
import { afterEach, expect, test } from 'vitest';

afterEach(cleanup);

test('check about component rendering', () => {
  const { container } = render(<About></About>);

  expect(container).toMatchSnapshot();
  expect(screen.queryByText('Ksenia Gaevskaya')).not.toBeNull();
});

test('check the link with data-test-id', () => {
  render(<About></About>);
  const link = screen.getByTestId('github-link');
  expect(link).not.toBeNull();
  expect(link).toHaveAttribute('href', 'https://github.com/ksugaevskaya');
  expect(link).toHaveAttribute('target', '_blank');
});

test('check the link is clicked', () => {
  render(<About></About>);
  fireEvent.click(screen.getByTestId('github-link'));
});

test('check the link to rss with data-test-id', () => {
  render(<About></About>);
  const link = screen.getByTestId('rss-github-link');
  expect(link).not.toBeNull();
  expect(link).toHaveAttribute('href', 'https://rs.school/');
  expect(link).toHaveAttribute('target', '_blank');
});
