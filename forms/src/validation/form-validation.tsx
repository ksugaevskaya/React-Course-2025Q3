import * as yup from 'yup';

export const schema = yup
  .object({
    fname: yup
      .string()
      .test(
        'firstLetterCapitalized',
        'The first letter should be capitalized',
        (value) => {
          if (!value) {
            return false;
          }
          const first = value[0];
          return first === first.toUpperCase() && !'0123456789'.includes(first);
        }
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
    country: yup.string().required('Country should be selected'),
    checkbox: yup
      .string()
      .oneOf(['true'], 'Please accept terms and conditions agreement')
      .required('Please accept terms and conditions agreement'),
    file: yup
      .mixed<FileList>()
      .required('A file is required')
      .test(
        'fileSize',
        'File too large, must be less than 1MB',
        (value) => !value || (value && value[0]?.size <= 1_000_000)
      )
      .test(
        'fileFormat',
        'Unsupported Format, only JPEG or PNG',
        (value) =>
          !value ||
          (value && value[0]?.type === 'image/jpeg') ||
          value[0]?.type === 'image/png'
      ),
  })
  .required();
