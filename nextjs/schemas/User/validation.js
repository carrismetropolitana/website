/* * */

import * as yup from 'yup';

/* * */

export const UserValidation = yup.object({
  //
  display_name: yup.string().max(50).required(),
  //
  email: yup.string().email().required(),
  phone: yup.string().max(13),
  //
});
