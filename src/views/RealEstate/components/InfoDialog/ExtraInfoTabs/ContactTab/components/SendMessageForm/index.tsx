import * as yup from 'yup';
import { BoxProps, Button, FormControl, TextField, Typography } from '@mui/material';
import Item, { ItemProps } from '../Item';
import { useFormik } from 'formik';
import { ComponentProps } from 'react';

export interface FormState {
  name: string;
  message: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  message: yup.string().max(200).required()
});

const SendMessageForm = ({
  onSubmit,
  didSubmit = false,
  onTakeMeClick
}: {
  onSubmit?(value: FormState): void;
  didSubmit?: boolean;
  onTakeMeClick?(): void;
}) => {
  const formik = useFormik<FormState>({
    initialValues: {
      name: '',
      message: ''
    },
    validationSchema,
    onSubmit(values, helpers) {
      if (onSubmit) {
        onSubmit(values);
      }
    }
  });

  return !didSubmit ? (
    <form onSubmit={formik.handleSubmit} autoComplete='off'>
      <FormControl margin='none' fullWidth>
        <TextField
          id='name'
          placeholder='Please enter your name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          size='small'
          variant='standard'
          name='name'
          label='Name'
          type='name'
          autoComplete='off'
        />
      </FormControl>
      <FormControl margin='none' fullWidth>
        <TextField
          id='message'
          placeholder='Please enter your message'
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.message && Boolean(formik.errors.message)}
          helperText={formik.touched.message && formik.errors.message}
          size='small'
          margin='none'
          variant='standard'
          label='Message'
          autoComplete='off'
          multiline
          rows={3}
        />
      </FormControl>
      <FormControl sx={{ width: '100%', alignItems: 'flex-end', mt: '0.5rem' }}>
        <Button variant='contained' size='small' sx={{ width: '4.5rem' }} type='submit'>
          Send
        </Button>
      </FormControl>
    </form>
  ) : (
    <div style={{ textAlign: 'center' }}>
      <Typography variant='h5'>Your message was sent successfully!</Typography>
      <Typography fontSize='0.93rem'>Next, you should provide them with other ways to contact you.</Typography>
      <Typography variant='caption'>
        For now, they will be able to send you an in site message.
        <br />
        (can be disabled in the "Call me back" section)
      </Typography>
      <Button
        onClick={onTakeMeClick}
        variant='contained'
        sx={{ display: 'block', mx: 'auto', mt: '0.5rem', fontSize: '0.8rem', backgroundColor: 'primary.light' }}
      >
        Take me to "Call me back"
      </Button>
    </div>
  );
};

export default SendMessageForm;
