import { expect, test } from 'vitest';
import ThemeComponent from './theme-component';
import { fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from '../../context/theme';

test('check correct theme rendering', () => {
  const { container } = render(
    <ThemeProvider>
      <ThemeComponent></ThemeComponent>
    </ThemeProvider>
  );

  expect(container).toMatchSnapshot();
  expect(screen.queryAllByText('Switch theme'));
});

test('check onClick functionality', () => {
  render(
    <ThemeProvider>
      <ThemeComponent></ThemeComponent>
    </ThemeProvider>
  );

  expect(localStorage.getItem('theme')).not.toBe('dark');
  expect(document.documentElement.getAttribute('data-theme')).not.toBe('dark');

  fireEvent.click(screen.getByText('Switch theme'));

  expect(localStorage.getItem('theme')).toBe('dark');
  expect(document.documentElement.getAttribute('data-theme')).toBe('dark');

  fireEvent.click(screen.getByText('Switch theme'));

  expect(localStorage.getItem('theme')).toBe('light');
  expect(document.documentElement.getAttribute('data-theme')).toBe('light');
});
