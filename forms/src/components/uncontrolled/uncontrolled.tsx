import { useState } from 'react';
import './uncontrolled.css';

export const hasAtLeastOneSymbol = (
  string: string,
  symbols: string
): boolean => {
  for (let i = 0; i < symbols.length; i++) {
    if (string.includes(symbols[i])) {
      return true;
    }
  }

  return false;
};

export default function UncontrolledForm() {
  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [fileError, setFileError] = useState('');

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const values = Object.fromEntries(formData.entries());

    console.log(values);

    if (values.fname === '') {
      setFirstNameError('First name is required');
    }

    if (values.fname[0] !== values.fname[0]?.toUpperCase?.()) {
      setFirstNameError('The first letter should be capitalized');
    }

    for (let i = 0; i < values.age.length; i++) {
      if (!'0123456789'.includes(values.age[i])) {
        setAgeError('Age should be a number');
      }
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(values.email)) {
      setEmailError(
        'Email address must be properly formatted (e.g., user@example.com)'
      );
    }

    if (values.email !== values.email.trim()) {
      setEmailError(
        'Email address must not contain leading or trailing whitespace'
      );
    }
    const parts = values.email.split('@');
    if (parts.length !== 2 || !parts[1]) {
      setEmailError(
        'Email address must contain a domain name (e.g., example.com)'
      );
    }
    if (!values.email.includes('@')) {
      setEmailError('Email address must contain @');
    }

    if (
      !hasAtLeastOneSymbol(
        values.password,
        `!"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`
      )
    ) {
      setPasswordError(
        `Password must contain at least one special character !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`
      );
    }
    if (!hasAtLeastOneSymbol(values.password, '0123456789')) {
      setPasswordError('Password must contain at least one digit');
    }
    if (!hasAtLeastOneSymbol(values.password, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ')) {
      setPasswordError(
        'Password must contain at least one uppercase letter (A-Z).'
      );
    }
    if (!hasAtLeastOneSymbol(values.password, 'abcdefghijklmnopqrstuvwxyz')) {
      setPasswordError(
        'Password must contain at least one lowercase letter (a-z).'
      );
    }

    if (values.password !== values.passwordRepeat) {
      setPasswordRepeatError('Repeat password should match current password');
    }

    if (values.gender === undefined) {
      setGenderError('Gender should be selected');
    }

    if (values.checkbox === undefined) {
      setTermsError('Please accept terms and conditions agreement');
    }

    if (values.file.type !== 'image/png' && values.file.type !== 'image/jpeg') {
      setFileError('File extension should be png or jpeg only');
    }

    if (values.file.size > 1_000_000) {
      setFileError('File size should be less than 1MB');
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fname">First name:</label>
        <input
          type="text"
          id="fname"
          name="fname"
          placeholder="Write your name"
          data-testid="fname"
        />

        {firstNameError && (
          <div className="error" data-testid="fname-error">
            {firstNameError}
          </div>
        )}

        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          name="age"
          placeholder="Write your age"
          data-testid="age"
        />

        {ageError && (
          <div className="error" data-testid="age-error">
            {' '}
            {ageError}
          </div>
        )}

        <label htmlFor="email">Email:</label>
        <input type="text" id="email" name="email" data-testid="email" />

        {emailError && (
          <div className="error" data-testid="email-error">
            {emailError}
          </div>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          data-testid="password"
        />

        {passwordError && (
          <div className="error" data-testid="password-error">
            {passwordError}
          </div>
        )}

        <label htmlFor="passwordRepeat">Repeat password:</label>
        <input
          type="passwordRepeat"
          id="passwordRepeat"
          name="passwordRepeat"
          data-testid="passwordRepeated"
        />

        {passwordRepeatError && (
          <div className="error" data-testid="passwordRepeated-error">
            {passwordRepeatError}{' '}
          </div>
        )}

        <p>Gender:</p>
        <input type="radio" id="female" name="gender" value="female" />
        <label htmlFor="female">Female</label>
        <input type="radio" id="male" name="gender" value="male" />
        <label htmlFor="male">Male</label>

        {genderError && (
          <div data-testid="gender-error" className="error">
            {genderError}
          </div>
        )}

        <input type="checkbox" id="checkbox" name="checkbox" />
        <label htmlFor="checkbox"> Accept Terms and Conditions agreement</label>

        {termsError && (
          <div data-testid="checkbox-error" className="error">
            {termsError}
          </div>
        )}

        <label htmlFor="file"> Upload picture:</label>
        <input type="file" id="file" name="file"></input>

        {fileError && <div className="error">{fileError}</div>}

        <input data-testid="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
