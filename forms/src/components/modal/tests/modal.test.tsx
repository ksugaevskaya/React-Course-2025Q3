import { afterEach, expect, test, vitest } from 'vitest';
import Modal from '../modal';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

afterEach(cleanup);

test('check modal correct rendering', () => {
  render(
    <Modal visible={true} onClose={vitest.fn()}>
      <div> Hello</div>
    </Modal>
  );

  expect(screen).toMatchSnapshot();
});

test('close button clicked', () => {
  const onClose = vitest.fn();
  render(
    <Modal visible={true} onClose={onClose}>
      <div> Hello</div>
    </Modal>
  );
  const modalContent = screen.getByTestId('modalContent');
  fireEvent.click(modalContent);

  expect(onClose).toHaveBeenCalledTimes(0);

  const cross = screen.getByTestId('cross');
  fireEvent.click(cross);

  expect(onClose).toHaveBeenCalledTimes(1);

  const greyArea = screen.getByTestId('greyArea');
  fireEvent.click(greyArea);

  expect(onClose).toHaveBeenCalledTimes(2);

  fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
  expect(onClose).toHaveBeenCalledTimes(3);
});

test('accessibility', () => {
  render(
    <Modal visible={true} onClose={vitest.fn()}>
      <div> Hello</div>
    </Modal>
  );

  const modalContent = screen.getByTestId('modalContent');

  expect(modalContent).toHaveAttribute('aria-modal', 'true');
  expect(modalContent).toHaveAttribute('role', 'dialog');

  const cross = screen.getByTestId('cross');
  expect(cross).toHaveAttribute('aria-label', 'Close dialog');
});
