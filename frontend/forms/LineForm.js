import parseDateToString from '@/services/parseDateToString';
import { createFormContext } from '@mantine/form';

/* * */
/* FORM CONTEXT: LINE */
/* Explanation needed. */
/* * */

export const [LineFormProvider, useLineFormContext, useLineForm] = createFormContext();

/* * */
/* FORM CONTEXT: LINE */
/* Explanation needed. */
/* * */

export const LineFormDefault = {
  municipality_code: '',
  line_code: '',
  pattern_code: '',
  date: new Date(),
  date_string: parseDateToString(new Date()),
  stop_code: '',
};

/* * */
/* FORM CONTEXT: LINE */
/* Explanation needed. */
/* * */

export const LineFormOptions = {
  validateInputOnBlur: true,
  validateInputOnChange: true,
  clearInputErrorOnChange: true,
  initialValues: LineFormDefault,
};
