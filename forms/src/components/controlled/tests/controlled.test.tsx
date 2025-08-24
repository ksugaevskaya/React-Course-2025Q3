import ControlledForm from '../controlled';
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
  useSelector: vitest.fn().mockReturnValue([]),
}));

test('uncontrolled component validation', () => {
  const { container } = render(
    <ControlledForm onSubmitted={vitest.fn()}></ControlledForm>
  );

  expect(container).toMatchSnapshot();
});

test('check first name validation', async () => {
  render(<ControlledForm onSubmitted={vitest.fn()}></ControlledForm>);
  const firstName = screen.getByTestId('fname');

  fireEvent.change(firstName, { target: { value: 'ksusha' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const firstNameError = await screen.findByTestId('fname-error');

  expect(firstNameError).toHaveTextContent(
    'The first letter should be capitalized'
  );
});

test('check age validation error', async () => {
  render(<ControlledForm onSubmitted={vitest.fn()}></ControlledForm>);
  const age = screen.getByTestId('age');

  fireEvent.change(age, { target: { value: 'ee' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const ageError = await screen.findByTestId('age-error');
  expect(ageError).toHaveTextContent('Age must be a number');
});

test('check email validation error', async () => {
  render(<ControlledForm onSubmitted={vitest.fn()}></ControlledForm>);

  const email = screen.getByTestId('email');

  fireEvent.change(email, { target: { value: 'djfjfj.com' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const emailError = await screen.findByTestId('email-error');
  expect(emailError).toHaveTextContent(
    'Email address must be properly formatted (e.g., user@example.com)'
  );

  fireEvent.change(email, { target: { value: ' djfjfj.@com ' } });
  fireEvent.click(submit);

  expect(emailError).toHaveTextContent(
    'Email address must be properly formatted (e.g., user@example.com)'
  );

  fireEvent.change(email, { target: { value: 'ksu@' } });
  fireEvent.click(submit);

  expect(emailError).toHaveTextContent(
    'Email address must be properly formatted (e.g., user@example.com)'
  );

  fireEvent.change(email, { target: { value: 'ksu@com' } });
  fireEvent.click(submit);

  expect(emailError).toHaveTextContent(
    'Email address must be properly formatted (e.g., user@example.com)'
  );
});

test('check password validation error', async () => {
  render(<ControlledForm onSubmitted={vitest.fn()}></ControlledForm>);

  const password = screen.getByTestId('password');
  const passwordStrength = screen.getByTestId('password-strength');

  expect(passwordStrength).toHaveTextContent('🔴 Weak');

  fireEvent.change(password, { target: { value: 'qweryu' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const passwordError = await screen.findByTestId('password-error');

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      'Password must contain at least one uppercase letter (A-Z).'
    )
  );
  expect(passwordStrength).toHaveTextContent('🔴 Weak');

  fireEvent.change(password, { target: { value: 'Asfdsgdfg' } });
  fireEvent.click(submit);

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      'Password must contain at least one digit'
    )
  );
  expect(passwordStrength).toHaveTextContent('🟠 Medium');

  fireEvent.change(password, { target: { value: 'ADHF1234' } });
  fireEvent.click(submit);

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      'Password must contain at least one lowercase letter (a-z)'
    )
  );
  expect(passwordStrength).toHaveTextContent('🟠 Medium');

  fireEvent.change(password, { target: { value: 'ADHFaa1234' } });
  fireEvent.click(submit);

  await waitFor(() =>
    expect(passwordError).toHaveTextContent(
      `Password must contain at least one special character !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`
    )
  );
  expect(passwordStrength).toHaveTextContent('🟢 Strong');

  fireEvent.change(password, { target: { value: 'ADHFaa1234!' } });
  fireEvent.click(submit);

  await waitFor(() =>
    expect(passwordStrength).toHaveTextContent('🟣 Super strong')
  );
});

test('check if password matches repeated password', async () => {
  render(<ControlledForm onSubmitted={vitest.fn()}></ControlledForm>);

  const passwordRepeated = screen.getByTestId('passwordRepeated');
  const password = screen.getByTestId('password');

  fireEvent.change(password, { target: { value: 'Aa1!' } });
  fireEvent.change(passwordRepeated, { target: { value: 'Aa1' } });

  const submit = screen.getByTestId('submit');
  fireEvent.click(submit);

  const passwordRepeatedError = await screen.findByTestId(
    'passwordRepeated-error'
  );
  await waitFor(() =>
    expect(passwordRepeatedError).toHaveTextContent(
      'Repeat password should match current password'
    )
  );
});

test('check checkbox error', async () => {
  render(<ControlledForm onSubmitted={vitest.fn()}></ControlledForm>);
  const submit = screen.getByTestId('submit');

  fireEvent.click(submit);
  const checkbox = screen.getByTestId('check-box');

  fireEvent.click(checkbox);
  fireEvent.click(checkbox);

  const checkboxError = await screen.findByTestId('checkbox-error');

  expect(checkboxError).toHaveTextContent(
    'Please accept terms and conditions agreement'
  );
});
