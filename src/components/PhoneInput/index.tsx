import { ComponentType, forwardRef, LegacyRef, Component, useRef, ComponentPropsWithRef } from 'react';
import 'react-phone-number-input/style.css';
import {
  TextField,
  Select,
  MenuItem,
  InputAdornment,
  SelectChangeEvent,
  TextFieldProps,
  SelectProps,
  Typography
} from '@mui/material';
import { useState } from 'react';
import ReactPhoneInput, { FeatureProps, Flags, Props, State, Country, Value } from 'react-phone-number-input';
import { getCountryCallingCode } from 'react-phone-number-input';

type CountryCodeOrEmptyString = Country | '';

interface FlagProps {
  country: CountryCodeOrEmptyString;
  countryName: string;
  flagUrl?: string;
  flags?: Flags;
  label: string;
}

export type CountrySelectProps = {
  options: { value: CountryCodeOrEmptyString; label: string }[];
  iconComponent: ComponentType<FlagProps>;
  value: Country;
  onChange(value?: Value): void;
  name: string;
};
const CountrySelect = ({
  options,
  iconComponent: FlagIcon,
  value,
  onChange,
  name,
  ...rest
}: CountrySelectProps & SelectProps) => {
  const handleChange = (e: SelectChangeEvent<CountryCodeOrEmptyString>) => {
    onChange(e.target.value);
  };
  const countryName = name ? name.slice(0, 2) : 'Auto detect';
  return (
    <Select<CountryCodeOrEmptyString>
      margin='none'
      {...rest}
      defaultValue={''}
      style={{ marginRight: '5px', ...rest.style }}
      MenuProps={{
        ...rest.MenuProps,
        style: { maxHeight: '10rem', ...rest.MenuProps?.style }
      }}
      onChange={handleChange}
      value={value || ''}
      name={name}
      displayEmpty
      renderValue={v => (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            padding: '5px'
          }}
        >
          <FlagIcon country={v} label={countryName} countryName={countryName} />
        </div>
      )}
    >
      {options.map((option, i) => (
        <MenuItem key={i} value={option.value || ''}>
          <div style={{ marginRight: '10px' }}>
            <FlagIcon country={option.value} countryName={countryName} label={countryName} />
          </div>
          {option.label}
          {option.value && ` +${getCountryCallingCode(option.value)}`}
        </MenuItem>
      ))}
    </Select>
  );
};

const PhoneInputField = forwardRef<HTMLTextAreaElement | HTMLInputElement, TextFieldProps>((props, ref) => {
  return (
    <TextField
      {...props}
      InputProps={{
        ...props.InputProps,
        style: { backgroundColor: '#fff', ...props.InputProps?.style }
      }}
      inputRef={ref}
      // fullWidth={props.fullWidth ?? true}
      name={props.name || 'phone'}
    />
  );
});
type ReactPhoneInputHiddenProps =
  | 'ref'
  | 'countrySelectComponent'
  | 'countrySelectProps'
  | 'inputComponent'
  | 'numberInputProps'
  | 'name';

type PhoneInputRef = Component<Props<TextFieldProps>, State<Props<TextFieldProps>>>;
export interface PhoneInputProps extends Omit<Props<TextFieldProps>, ReactPhoneInputHiddenProps> {
  textFieldProps?: TextFieldProps;
  selectProps?: Omit<SelectProps, keyof CountrySelectProps | 'renderValue'>;
}

const PhoneInput = forwardRef<PhoneInputRef, PhoneInputProps>(
  ({ textFieldProps, selectProps, onChange, onCountryChange, ...rest }, ref) => {
    const [currentName, setName] = useState<CountryCodeOrEmptyString>();
    const handleCountryChange = (value: Country) => {
      setName(value);
      if (onCountryChange) {
        onCountryChange(value);
      }
    };
    return (
      <ReactPhoneInput
        ref={ref}
        addInternationalOption
        international
        onChange={onChange}
        onCountryChange={handleCountryChange}
        countrySelectProps={selectProps}
        countrySelectComponent={CountrySelect}
        numberInputProps={textFieldProps}
        inputComponent={PhoneInputField}
        name={currentName}
        {...rest}
      />
    );
  }
);

export default PhoneInput;
