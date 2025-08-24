import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import type { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  reg?: UseFormRegisterReturn;
};

export default function CountryAutocomplete({ reg }: Props) {
  const countries = useSelector((state: RootState) => state.countries.value);
  const [value, setValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      <label htmlFor="country">Country: </label>
      <input
        id="country"
        list="country-list"
        value={value}
        {...(reg
          ? {
              ...reg,
              onChange: (e) => {
                handleChange(e);
                reg.onChange(e);
              },
            }
          : { onChange: handleChange, name: 'country' })}
        placeholder="Write a country..."
        autoComplete="off"
        data-testid="country"
      />
      <datalist id="country-list">
        {countries.map((c: string) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </div>
  );
}
