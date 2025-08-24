import { useState } from 'react';
import './uncontrolled.css';
import { useDispatch } from 'react-redux';
import { updateUncontrolledForm } from '../../redux/slices/form';
import { fileToBase64 } from '../../helpers/base64';
import { schema } from '../../validation/form-validation';
import * as yup from 'yup';
import usePasswordStrength from '../../hooks/use-password-strength';

type Errors = Record<string, string>;

type Props = {
  onSubmitted: () => void;
};

export default function UncontrolledForm({ onSubmitted }: Props) {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState<Errors>({});
  const [strength, handlePasswordChange] = usePasswordStrength();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const fd = new FormData(e.currentTarget);

    const values = {
      fname: fd.get('fname'),
      age: fd.get('age'),
      email: fd.get('email'),
      password: fd.get('password'),
      passwordRepeat: fd.get('passwordRepeat'),
      gender: fd.get('gender'),
      checkbox: fd.get('checkbox'),
      file: fd.get('file'),
    };

    try {
      const validated = await schema.validate(values, { abortEarly: false });
      const fileBase64 = await fileToBase64(validated.file[0]);

      dispatch(
        updateUncontrolledForm({
          ...validated,
          file: fileBase64,
        })
      );
      onSubmitted();
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const next: Errors = {};
        for (const issue of err.inner) {
          if (issue.path && !next[issue.path]) next[issue.path] = issue.message;
        }
        setErrors(next);
      }
    }
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
            {errors.fname}
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
            {errors.age}
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
            {errors.emailError}
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
            onChange={handlePasswordChange}
          />
          <span data-testid="password-strength">
            {strength <= 1 && ' 🔴 Weak'}
            {strength === 2 && ' 🟠 Medium'}
            {strength === 3 && ' 🟢 Strong'}
            {strength === 4 && ' 🟣 Super strong'}
          </span>

          <div className="error" data-testid="password-error">
            {errors.password}
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
            {errors.passwordRepeat}
          </div>
        </div>
        <div>
          <span>Gender:</span>
          <input type="radio" id="female" name="gender" value="female" />
          <label htmlFor="female">Female</label>
          <input type="radio" id="male" name="gender" value="male" />
          <label htmlFor="male">Male</label>

          <div data-testid="gender-error" className="error">
            {errors.gender}
          </div>
        </div>

        <div>
          <label htmlFor="file"> Upload picture: </label>
          <input type="file" id="file" name="file"></input>

          <div className="error">{errors.file}</div>
        </div>
        <div>
          <input type="checkbox" id="checkbox" name="checkbox" />
          <label htmlFor="checkbox">
            {' '}
            Accept terms and conditions agreement
          </label>

          <div data-testid="checkbox-error" className="error">
            {errors.checkbox}
          </div>
        </div>
        <div>
          <input data-testid="submit" type="submit" value="Submit" />
        </div>
      </form>
    </>
  );
}
