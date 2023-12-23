/* * */

import * as yup from 'yup';

/* * */

export const SignInValidation = yup.object({
  email: yup.string().email('Please provide a valid email address.').required('Please enter your TML email.'),
  email: yup.string().required('Please enter your TML email.'),
});
