import UncontrolledForm from '../uncontrolled';
import { beforeEach, expect, test } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

beforeEach(cleanup);

test('uncontrolled component validation', () => {
  render(<UncontrolledForm></UncontrolledForm>);

  expect(screen).toMatchSnapshot();
});

test('check first name validation', () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const firstName = screen.getByTestId('fname');

  fireEvent.change(firstName, { target: { value: 'ksusha' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const firstNameError = screen.getByTestId('fname-error');
  expect(firstNameError).toHaveTextContent(
    'The first letter should be capitalized'
  );
});

test('check age validation error', () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const age = screen.getByTestId('age');

  fireEvent.change(age, { target: { value: 'ee' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const ageError = screen.getByTestId('age-error');
  expect(ageError).toHaveTextContent('Age should be a number');
});

test('check email validation error', () => {
  render(<UncontrolledForm></UncontrolledForm>);

  const email = screen.getByTestId('email');

  fireEvent.change(email, { target: { value: 'djfjfj.com' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const emailError = screen.getByTestId('email-error');
  expect(emailError).toHaveTextContent('Email address must contain @');

  fireEvent.change(email, { target: { value: ' djfjfj.@com ' } });
  fireEvent.click(submit);

  expect(emailError).toHaveTextContent(
    'Email address must not contain leading or trailing whitespace'
  );

  fireEvent.change(email, { target: { value: 'ksu@' } });
  fireEvent.click(submit);

  expect(emailError).toHaveTextContent(
    'Email address must contain a domain name (e.g., example.com)'
  );

  fireEvent.change(email, { target: { value: 'ksu@com' } });
  fireEvent.click(submit);

  expect(emailError).toHaveTextContent(
    'Email address must be properly formatted (e.g., user@example.com)'
  );
});

test('check password validation error', () => {
  render(<UncontrolledForm></UncontrolledForm>);

  const password = screen.getByTestId('password');

  fireEvent.change(password, { target: { value: 'qweryu' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const passwordError = screen.getByTestId('password-error');

  expect(passwordError).toHaveTextContent(
    'Password must contain at least one uppercase letter (A-Z).'
  );

  fireEvent.change(password, { target: { value: 'Asfdsgdfg' } });
  fireEvent.click(submit);

  expect(passwordError).toHaveTextContent(
    'Password must contain at least one digit'
  );

  fireEvent.change(password, { target: { value: 'ADHF1234' } });
  fireEvent.click(submit);

  expect(passwordError).toHaveTextContent(
    'Password must contain at least one lowercase letter (a-z)'
  );

  fireEvent.change(password, { target: { value: 'ADHFaa1234' } });
  fireEvent.click(submit);

  expect(passwordError).toHaveTextContent(
    `Password must contain at least one special character !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`
  );
});

test('check if password matches repeated password', () => {
  render(<UncontrolledForm></UncontrolledForm>);

  const passwordRepeated = screen.getByTestId('passwordRepeated');
  const password = screen.getByTestId('password');

  fireEvent.change(password, { target: { value: 'Aa1!' } });
  fireEvent.change(passwordRepeated, { target: { value: 'Aa1' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const passwordRepeatedError = screen.getByTestId('passwordRepeated-error');
  expect(passwordRepeatedError).toHaveTextContent(
    'Repeat password should match current password'
  );
});

test('check radio button error', () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const submit = screen.getByTestId('submit');

  fireEvent.click(submit);

  const genderError = screen.getByTestId('gender-error');

  expect(genderError).toHaveTextContent('Gender should be selected');
});

test('check checkbox error', () => {
  render(<UncontrolledForm></UncontrolledForm>);
  const submit = screen.getByTestId('submit');

  fireEvent.click(submit);

  const checkboxError = screen.getByTestId('checkbox-error');

  expect(checkboxError).toHaveTextContent(
    'Please accept terms and conditions agreement'
  );
});
