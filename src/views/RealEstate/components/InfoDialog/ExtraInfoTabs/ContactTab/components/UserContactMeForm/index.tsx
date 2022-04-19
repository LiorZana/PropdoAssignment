import PhoneInput from '@/components/PhoneInput';
import { Button, Divider, FormControlLabel, FormHelperText, List, ListItem, Switch, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { useEffect, useMemo } from 'react';
import { Value as PhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import { css } from '@emotion/react';
import * as yup from 'yup';
import useFieldValidation from '@/hooks/useValidation';

interface UserContactFromState {
  useInSite: boolean;
  email: string;
  phone: PhoneNumber;
}

const validationSchema = yup.object().shape({
  useInSite: yup.bool().default(false).required(),
  email: yup.string().default('').label('Email'),
  // .when('phone', {
  //   is: (phone: string) => !phone || phone.length === 0,
  //   then: yup.string().email().required(''),
  //   otherwise: yup.string().email()
  // })
  phone: yup.string().default('').label('Phone')
  // .when('email', {
  //   is: (email: string) => !email || email.length === 0,
  //   then: yup
  //     .string()
  //     .required('')
  //     .test('isValid', 'Please enter a valid phone number', value => isValidPhoneNumber(value || '')),
  //   otherwise: yup
  //     .string()
  //     .test('isValid', 'Please enter a valid phone number', value => !value || isValidPhoneNumber(value))
  // })
});
const UserContactMeForm = ({
  useInSite = true,
  email = 'liorzana@gmail.com',
  phone = '+972547754801'
}: {
  useInSite?: boolean;
  email?: string;
  phone?: string;
}) => {
  const formik = useFormik<UserContactFromState>({
    initialValues: { useInSite: true, email: '', phone: '' },
    validationSchema,
    onSubmit(values, formikHelpers) {
      console.log(values);
    }
  });
  // {
  //   email: yup.string().email(),
  //   phone: yup.string(),
  //   useInSite: yup.boolean().required()
  // }
  // const validators = useFieldValidation({
  //   email: yup.string().default('').email(),
  //   useInSite: yup.boolean().default(true).required()
  // });

  const phoneFieldHelpers = useMemo(() => formik.getFieldHelpers('phone'), [formik]);
  return (
    <form>
      <FormControlLabel
        id='useInSite'
        name='useInSite'
        checked={formik.values.useInSite}
        onChange={(e, v) => {
          formik.handleChange(e);
          // validators.fields.useInSite.setValue(v);
          // useInSiteFieldHandler.setValue(v);
        }}
        onBlur={formik.handleBlur}
        control={<Switch />}
        label='Use in-site messages'
      />
      <Divider />
      <TextField
        fullWidth
        value={formik.values.email}
        error={formik.touched.email && formik.errors.email !== undefined}
        helperText={formik.touched.email && formik.errors.email}
        onChange={e => {
          formik.handleChange(e);
          // validators.fields.email.handleChange(e);
        }}
        onBlur={formik.handleBlur}
        id='email'
        sx={{ my: '0.5rem', pr: '5rem' }}
        size='small'
        label='Email'
        type='email'
        name='email'
      />
      <Divider />
      <PhoneInput
        // international
        id='phone'
        value={formik.values.phone}
        error={formik.touched.phone && formik.errors.phone !== undefined}
        onChange={v => {
          phoneFieldHelpers.setValue(v || '');
        }}
        onBlur={formik.handleBlur}
        css={css`
          margin: 0.5rem 0;
        `}
        selectProps={{
          size: 'small',
          sx: { height: '40px' },
          error: formik.touched.phone && formik.errors.phone !== undefined
        }}
        textFieldProps={{ size: 'small', placeholder: 'Phone number', sx: { pr: '5rem' } }}
        // error={formik.touched.phone && Boolean(formik.errors.phone)}
      />
      {formik.touched.phone && (
        <FormHelperText
          sx={{ mt: 0, mb: 1, lineHeight: '0.5rem' }}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
        >
          {formik.errors.phone}
        </FormHelperText>
      )}
      <Divider />
      <div
        css={css`
          width: 100%;
          display: flex;
          justify-content: flex-end;
          margin-top: 0.5rem;
        `}
      >
        <Button variant='contained' size='small' sx={{ width: '4.5rem' }} type='submit'>
          Send
        </Button>
      </div>
    </form>
  );
};

export default UserContactMeForm;
