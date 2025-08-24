import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../../validation/form-validation';
import { useDispatch } from 'react-redux';
import { updateControlledForm } from '../../redux/slices/form';
import './controlled.css';
import { fileToBase64 } from '../../helpers/base64';

type FormValues = {
  checkbox?: string;
  fname: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: string;
  file: FileList;
};

type Props = {
  onSubmitted: () => void;
};

export default function ControlledForm({ onSubmitted }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });
  const dispatch = useDispatch();

  const onSubmit = async (data: FormValues) => {
    dispatch(
      updateControlledForm({ ...data, file: await fileToBase64(data.file[0]) })
    );
    onSubmitted();
  };

  return (
    <div>
      <form className="controlled-container" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="fname">First name: </label>
          <input
            type="text"
            id="fname"
            placeholder="Write your name"
            data-testid="fname"
            {...register('fname')}
          />

          <div className="error" data-testid="fname-error">
            {errors.fname?.message}
          </div>
        </div>

        <div>
          <label htmlFor="age">Age: </label>
          <input
            type="text"
            id="age"
            placeholder="Write your age"
            data-testid="age"
            {...register('age')}
          />

          <div className="error" data-testid="age-error">
            {' '}
            {errors.age?.message}
          </div>
        </div>

        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            id="email"
            data-testid="email"
            {...register('email')}
            placeholder="Write your email"
          />

          <div className="error" data-testid="email-error">
            {errors.email?.message}
          </div>
        </div>
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="password"
            id="password"
            data-testid="password"
            {...register('password')}
            placeholder="Write your password"
          />

          <div className="error" data-testid="password-error">
            {errors.password?.message}
          </div>
        </div>

        <div>
          <label htmlFor="passwordRepeat">Repeat password: </label>
          <input
            type="password"
            id="passwordRepeat"
            data-testid="passwordRepeated"
            {...register('passwordRepeat')}
            placeholder="Repeat your password"
          />

          <div className="error" data-testid="passwordRepeated-error">
            {errors.passwordRepeat?.message}{' '}
          </div>
        </div>

        <div>
          <span>Gender: </span>
          <input
            type="radio"
            id="female"
            value="female"
            {...register('gender')}
          />
          <label htmlFor="female">Female</label>
          <input type="radio" id="male" value="male" {...register('gender')} />
          <label htmlFor="male">Male</label>

          <div data-testid="gender-error" className="error">
            {errors.gender?.message}
          </div>
        </div>

        <div>
          <label htmlFor="file"> Upload picture: </label>
          <input type="file" id="file" {...register('file')}></input>

          <div className="error">{errors.file?.message}</div>
        </div>

        <div>
          <input
            type="checkbox"
            id="checkbox"
            data-testid="check-box"
            {...register('checkbox')}
          />
          <label htmlFor="checkbox">
            {' '}
            Accept terms and conditions agreement
          </label>

          <div data-testid="checkbox-error" className="error">
            {errors.checkbox?.message}
          </div>
        </div>

        <div>
          <input
            data-testid="submit"
            type="submit"
            value="Submit"
            disabled={!isValid}
          />
        </div>
      </form>
    </div>
  );
}
