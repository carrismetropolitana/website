import { createFormContext } from '@mantine/form';

/* * */
/* FORM CONTEXT: LINE */
/* Explanation needed. */
/* * */

export const [LineFormProvider, useLineFormContext, useLineForm] = createFormContext();

export const LineFormDefault = {
  municipality_code: '',
  line_code: '',
  pattern_code: '',
  date: new Date(),
};
