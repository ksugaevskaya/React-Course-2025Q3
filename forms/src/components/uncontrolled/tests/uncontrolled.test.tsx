import UncontrolledForm from '../uncontrolled';
import { beforeEach, expect, test, vitest } from 'vitest';
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

beforeEach(cleanup);

vitest.mock('react-redux', () => ({
  useDispatch: vitest.fn().mockReturnValue(vitest.fn()),
}));

test('uncontrolled component validation', () => {
  const { container } = render(<UncontrolledForm></UncontrolledForm>);

  expect(container).toMatchSnapshot();
});

test('check first name validation', async () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const firstName = screen.getByTestId('fname');

  fireEvent.change(firstName, { target: { value: 'ksusha' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const firstNameError = screen.getByTestId('fname-error');
  await waitFor(() =>
    expect(firstNameError).toHaveTextContent(
      'The first letter should be capitalized'
    )
  );
});

test('check age validation error', async () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const age = screen.getByTestId('age');

  fireEvent.change(age, { target: { value: 'ee' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const ageError = screen.getByTestId('age-error');
  await waitFor(() =>
    expect(ageError).toHaveTextContent('Age must be a number')
  );
});

test('check password validation error', async () => {
  render(<UncontrolledForm></UncontrolledForm>);

  const password = screen.getByTestId('password');

  fireEvent.change(password, { target: { value: 'qweryu' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const passwordError = screen.getByTestId('password-error');

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      'Password must contain at least one uppercase letter (A-Z).'
    )
  );

  fireEvent.change(password, { target: { value: 'Asfdsgdfg' } });
  fireEvent.click(submit);

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      'Password must contain at least one digit'
    )
  );

  fireEvent.change(password, { target: { value: 'ADHF1234' } });
  fireEvent.click(submit);

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      'Password must contain at least one lowercase letter (a-z)'
    )
  );

  fireEvent.change(password, { target: { value: 'ADHFaa1234' } });
  fireEvent.click(submit);

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      `Password must contain at least one special character !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`
    )
  );
});

test('check if password matches repeated password', async () => {
  render(<UncontrolledForm></UncontrolledForm>);

  const passwordRepeated = screen.getByTestId('passwordRepeated');
  const password = screen.getByTestId('password');

  fireEvent.change(password, { target: { value: 'Aa1!' } });
  fireEvent.change(passwordRepeated, { target: { value: 'Aa1' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const passwordRepeatedError = screen.getByTestId('passwordRepeated-error');
  await waitFor(() =>
    expect(passwordRepeatedError).toHaveTextContent(
      'Repeat password should match current password'
    )
  );
});

test('check radio button error', async () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const submit = screen.getByTestId('submit');

  fireEvent.click(submit);

  const genderError = screen.getByTestId('gender-error');

  await waitFor(() =>
    expect(genderError).toHaveTextContent('Gender should be selected')
  );
});

test('check checkbox error', async () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const submit = screen.getByTestId('submit');

  fireEvent.click(submit);

  const checkboxError = screen.getByTestId('checkbox-error');

  await waitFor(() =>
    expect(checkboxError).toHaveTextContent(
      'Please accept terms and conditions agreement'
    )
  );
});
