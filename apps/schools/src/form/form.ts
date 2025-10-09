/* * */

import { type UpdateSchoolFormType } from '@/form/schema';
import { type School } from '@carrismetropolitana/api-types/facilities';
import { createFormContext } from '@mantine/form';

/* * */

export const [UpdateSchoolFormProvider, useUpdateSchoolFormContext, useUpdateSchoolForm] = createFormContext<UpdateSchoolFormType>();

/* * */

export function getPrefilledForm(schoolData: School): UpdateSchoolFormType {
	return {

		_password: '',

		comments: '',

		comms_contact: {
			email: '',
			name: '',
			phone: '',
		},

		contacts: {
			email: schoolData.contacts?.email ?? '',
			phone: schoolData.contacts?.phone ?? '',
			responder_name: '',
			responder_position: '',
			website: schoolData.contacts?.url ?? '',
		},

		location: {
			is_correct: null,
			latitude: null,
			longitude: null,
			postal_code: schoolData.contacts?.postal_code ?? '',
		},

		school_calendar: {
			block_1: {
				end_date: null,
				start_date: null,
			},
			block_2: {
				end_date: null,
				start_date: null,
			},
			block_3: {
				end_date: null,
				start_date: null,
			},
			calendar_type: null,
			interruptions: [],
		},

		school_cycles: {
			artistic: {
				_is_enabled: schoolData.cicles?.includes('artistic'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			basic_1: {
				_is_enabled: schoolData.cicles?.includes('basic_1'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			basic_2: {
				_is_enabled: schoolData.cicles?.includes('basic_2'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			basic_3: {
				_is_enabled: schoolData.cicles?.includes('basic_3'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			other: {
				_is_enabled: schoolData.cicles?.includes('other'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			pre_school: {
				_is_enabled: schoolData.cicles?.includes('pre_school'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			professional: {
				_is_enabled: schoolData.cicles?.includes('professional'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			secondary: {
				_is_enabled: schoolData.cicles?.includes('secondary'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			special: {
				_is_enabled: schoolData.cicles?.includes('special'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
			university: {
				_is_enabled: schoolData.cicles?.includes('university'),
				afternoon_entry: null,
				afternoon_exit: null,
				morning_entry: null,
				morning_exit: null,
			},
		},

	};
}
