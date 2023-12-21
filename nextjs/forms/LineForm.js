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
  municipality_id: '',
  line_id: '',
  pattern_id: '',
  date: new Date(),
  date_string: parseDateToString(new Date()),
  stop_id: '',
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
