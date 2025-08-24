import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validation /form-validation';
import { useDispatch } from 'react-redux';
import { updateControlledForm } from '../../redux/slices/form';

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  const onSubmit = (data) => dispatch(updateControlledForm(data));

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="fname">First name:</label>
        <input
          type="text"
          id="fname"
          placeholder="Write your name"
          data-testid="fname"
          {...register('fname')}
        />

        {errors.fname?.message && (
          <div className="error" data-testid="fname-error">
            {errors.fname?.message}
          </div>
        )}

        <label htmlFor="age">Age:</label>
        <input
          type="text"
          id="age"
          placeholder="Write your age"
          data-testid="age"
          {...register('age')}
        />

        {errors.age?.message && (
          <div className="error" data-testid="age-error">
            {' '}
            {errors.age?.message}
          </div>
        )}

        <label htmlFor="email">Email:</label>
        <input
          type="text"
          id="email"
          data-testid="email"
          {...register('email')}
        />

        {errors.email?.message && (
          <div className="error" data-testid="email-error">
            {errors.email?.message}
          </div>
        )}

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          data-testid="password"
          {...register('password')}
        />

        {errors.password?.message && (
          <div className="error" data-testid="password-error">
            {errors.password?.message}
          </div>
        )}

        <label htmlFor="passwordRepeat">Repeat password:</label>
        <input
          type="password"
          id="passwordRepeat"
          data-testid="passwordRepeated"
          {...register('passwordRepeat')}
        />

        {errors.passwordRepeat?.message && (
          <div className="error" data-testid="passwordRepeated-error">
            {errors.passwordRepeat?.message}{' '}
          </div>
        )}

        <p>Gender:</p>
        <input
          type="radio"
          id="female"
          value="female"
          {...register('gender')}
        />
        <label htmlFor="female">Female</label>
        <input type="radio" id="male" value="male" {...register('gender')} />
        <label htmlFor="male">Male</label>

        {errors.gender?.message && (
          <div data-testid="gender-error" className="error">
            {errors.gender?.message}
          </div>
        )}

        <input
          type="checkbox"
          id="checkbox"
          data-testid="check-box"
          {...register('checkbox')}
        />
        <label htmlFor="checkbox"> Accept Terms and Conditions agreement</label>

        {errors.checkbox?.message && (
          <div data-testid="checkbox-error" className="error">
            {errors.checkbox?.message}
          </div>
        )}

        <label htmlFor="file"> Upload picture:</label>
        <input type="file" id="file" {...register('file')}></input>

        {errors.file?.message && (
          <div className="error">{errors.file?.message}</div>
        )}

        <input
          data-testid="submit"
          type="submit"
          value="Submit"
          disabled={!isValid}
        />
      </form>
    </>
  );
}
