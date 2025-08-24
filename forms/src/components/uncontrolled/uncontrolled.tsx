import { useState } from 'react';
import './uncontrolled.css';
import { useDispatch } from 'react-redux';
import {
  updateControlledForm,
  updateUncontrolledForm,
} from '../../redux/slices/form';
import { fileToBase64 } from '../../helpers/base64';

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
  const dispatch = useDispatch();

  const [firstNameError, setFirstNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [ageError, setAgeError] = useState('');
  const [genderError, setGenderError] = useState('');
  const [termsError, setTermsError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordRepeatError, setPasswordRepeatError] = useState('');
  const [fileError, setFileError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    setFirstNameError('');
    setEmailError('');
    setAgeError('');
    setGenderError('');
    setTermsError('');
    setPasswordError('');
    setPasswordRepeatError('');
    setFileError('');
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

    dispatch(
      updateUncontrolledForm({
        ...values,
        file: await fileToBase64(values.file),
      })
    );
  }
  return (
    <>
      <form className="uncontrolled-container" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fname">First name: </label>
          <input
            type="text"
            id="fname"
            name="fname"
            placeholder="Write your name"
            data-testid="fname"
          />

          <div className="error" data-testid="fname-error">
            {firstNameError}
          </div>
        </div>
        <div>
          <label htmlFor="age">Age: </label>
          <input
            type="text"
            id="age"
            name="age"
            placeholder="Write your age"
            data-testid="age"
          />

          <div className="error" data-testid="age-error">
            {' '}
            {ageError}
          </div>
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            name="email"
            data-testid="email"
            placeholder="Write your email"
          />

          <div className="error" data-testid="email-error">
            {emailError}
          </div>
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            name="password"
            data-testid="password"
            placeholder="Write your password"
          />

          <div className="error" data-testid="password-error">
            {passwordError}
          </div>
        </div>

        <div>
          <label htmlFor="passwordRepeat">Repeat password: </label>
          <input
            type="password"
            id="passwordRepeat"
            name="passwordRepeat"
            data-testid="passwordRepeated"
            placeholder="Repeat your age"
          />

          <div className="error" data-testid="passwordRepeated-error">
            {passwordRepeatError}{' '}
          </div>
        </div>
        <div>
          <span>Gender:</span>
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">Female</label>
          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>

          <div data-testid="gender-error" className="error">
            {genderError}
          </div>
        </div>

        <div>
          <label htmlFor="file"> Upload picture: </label>
          <input type="file" id="file" name="file"></input>

          <div className="error">{fileError}</div>
        </div>
        <div>
          <input type="checkbox" id="checkbox" name="checkbox" />
          <label htmlFor="checkbox">
            {' '}
            Accept terms and conditions agreement
          </label>

          <div data-testid="checkbox-error" className="error">
            {termsError}
          </div>
        </div>
        <div>
          <input data-testid="submit" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}
