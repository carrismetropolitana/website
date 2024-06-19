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
	date: new Date(),
	date_string: parseDateToString(new Date()),
	line_id: '',
	municipality_id: '',
	pattern_id: '',
	stop_id: '',
};

/* * */
/* FORM CONTEXT: LINE */
/* Explanation needed. */
/* * */

export const LineFormOptions = {
	clearInputErrorOnChange: true,
	initialValues: LineFormDefault,
	validateInputOnBlur: true,
	validateInputOnChange: true,
};
