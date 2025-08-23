import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object({
    fname: yup
      .string()
      .test(
        'firstLetterCapitalized',
        'The first letter should be capitalized',
        (value) =>
          value?.[0] === value?.[0]?.toUpperCase?.() &&
          !'0123456789'.includes(value[0])
      )
      .required('First name must not be empty!'),
    age: yup
      .number()
      .typeError('Age must be a number')
      .positive('Age should be a positive number')
      .integer('Age should be a number')
      .required('Age must not be empty!'),
    email: yup
      .string()
      .email(
        'Email address must be properly formatted (e.g., user@example.com)'
      )
      .required('Email must not be empty'),
    password: yup
      .string()
      .required('Password is required')
      .matches(
        /[a-z]/,
        'Password must contain at least one lowercase letter (a-z).'
      )
      .matches(
        /[A-Z]/,
        'Password must contain at least one uppercase letter (A-Z).'
      )
      .matches(/\d/, 'Password must contain at least one digit')
      .matches(
        /[!"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
        `Password must contain at least one special character !"#$%&'()*+,-./:;<=>?@[\\]^_\`{|}~'`
      ),
    passwordRepeat: yup
      .string()
      .required('Repeat password is required')
      .oneOf(
        [yup.ref('password')],
        'Repeat password should match current password'
      ),
    gender: yup.string().required('Gender should be selected'),
    checkbox: yup
      .string()
      .oneOf(['true'], 'Please accept terms and conditions agreement'),
    file: yup
      .mixed()
      .required('A file is required')
      .test(
        'fileSize',
        'File too large, must be less than 1MB',
        (value) => !value || (value && value[0].size <= 1_000_000)
      )
      .test(
        'fileFormat',
        'Unsupported Format, only JPEG or PNG',
        (value) =>
          !value ||
          (value && value[0].type === 'image/jpeg') ||
          value[0].type === 'image/png'
      ),
  })
  .required();

export default function ControlledForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => console.log(data);

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
          type="passwordRepeat"
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

        <input type="checkbox" id="checkbox" {...register('checkbox')} />
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

        <input data-testid="submit" type="submit" value="Submit" />
      </form>
    </>
  );
}
