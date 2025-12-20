/* eslint-disable perfectionist/sort-objects */

/* * */

import { type UpdateSchoolFormType } from '@/form/schema';
import { type SchoolData } from '@/types/school';
import { Dates } from '@tmlmobilidade/dates';

/* * */

function parseDateRange(start, end) {
	if (!start || !end) return '-';
	return `De ${start} a ${end}`;
}

function parseTimeRange(start: string, end: string) {
	if (!start || !end) return '-';
	return `Das ${start.substring(0, 5)} às ${end.substring(0, 5)}`;
}

/* * */

export function transformDataForGoogleSheets(schoolId: string, schoolData: SchoolData | undefined, formData: UpdateSchoolFormType) {
	//

	const parsedData = {

		//
		// METADATA

		timestamp: Dates.now('Europe/Lisbon').iso,
		schoolId: schoolId,
		schoolName: schoolData.name ?? '-',
		municipality_name: schoolData.municipality_name ?? '-',

		//
		// LOCATION

		correct_location: formData.location.is_correct ? 'Sim' : 'Não',
		latitude: formData.location.latitude ?? '-',
		longitude: formData.location.longitude ?? '-',
		postal_code: formData.location.postal_code,

		//
		// GENERAL CONTACTS

		responsible_name: formData.contacts.responder_name,
		responsible_position: formData.contacts.responder_position,
		phone: formData.contacts.phone ?? '-',
		email: formData.contacts.email ?? '-',
		website: formData.contacts.website ?? '-',

		//
		// COMMUNICATION DEPT CONTACTS

		comms_contact_name: formData.comms_contact.name,
		comms_contact_email: formData.comms_contact.email ?? '-',
		comms_contact_phone: formData.comms_contact.phone ?? '-',

		//
		// COMMENTS

		comments: formData.comments ?? '-',

		//
		// SCHOOL CALENDAR

		calendar_type: formData.school_calendar.calendar_type === 'semester' ? 'Semestral' : 'Trimestral',
		block_1: parseDateRange(formData.school_calendar.block_1.start_date, formData.school_calendar.block_1.end_date),
		block_2: parseDateRange(formData.school_calendar.block_2.start_date, formData.school_calendar.block_2.end_date),
		block_3: parseDateRange(formData.school_calendar.block_3.start_date, formData.school_calendar.block_3.end_date),
		interruptions: formData.school_calendar.interruptions.length ? formData.school_calendar.interruptions.map(interruption => (parseDateRange(interruption.start_date, interruption.end_date))).join('\n') : '-',

		//
		// SCHOOL CYCLE TIMES

		pre_school_morning: parseTimeRange(formData.school_cycles.pre_school.morning_entry, formData.school_cycles.pre_school.morning_exit),
		pre_school_afternoon: parseTimeRange(formData.school_cycles.pre_school.afternoon_entry, formData.school_cycles.pre_school.afternoon_exit),

		basic_1_morning: parseTimeRange(formData.school_cycles.basic_1.morning_entry, formData.school_cycles.basic_1.morning_exit),
		basic_1_afternoon: parseTimeRange(formData.school_cycles.basic_1.afternoon_entry, formData.school_cycles.basic_1.afternoon_exit),

		basic_2_morning: parseTimeRange(formData.school_cycles.basic_2.morning_entry, formData.school_cycles.basic_2.morning_exit),
		basic_2_afternoon: parseTimeRange(formData.school_cycles.basic_2.afternoon_entry, formData.school_cycles.basic_2.afternoon_exit),

		basic_3_morning: parseTimeRange(formData.school_cycles.basic_3.morning_entry, formData.school_cycles.basic_3.morning_exit),
		basic_3_afternoon: parseTimeRange(formData.school_cycles.basic_3.afternoon_entry, formData.school_cycles.basic_3.afternoon_exit),

		secondary_morning: parseTimeRange(formData.school_cycles.secondary.morning_entry, formData.school_cycles.secondary.morning_exit),
		secondary_afternoon: parseTimeRange(formData.school_cycles.secondary.afternoon_entry, formData.school_cycles.secondary.afternoon_exit),

		professional_morning: parseTimeRange(formData.school_cycles.professional.morning_entry, formData.school_cycles.professional.morning_exit),
		professional_afternoon: parseTimeRange(formData.school_cycles.professional.afternoon_entry, formData.school_cycles.professional.afternoon_exit),

		special_morning: parseTimeRange(formData.school_cycles.special.morning_entry, formData.school_cycles.special.morning_exit),
		special_afternoon: parseTimeRange(formData.school_cycles.special.afternoon_entry, formData.school_cycles.special.afternoon_exit),

		artistic_morning: parseTimeRange(formData.school_cycles.artistic.morning_entry, formData.school_cycles.artistic.morning_exit),
		artistic_afternoon: parseTimeRange(formData.school_cycles.artistic.afternoon_entry, formData.school_cycles.artistic.afternoon_exit),

		university_morning: parseTimeRange(formData.school_cycles.university.morning_entry, formData.school_cycles.university.morning_exit),
		university_afternoon: parseTimeRange(formData.school_cycles.university.afternoon_entry, formData.school_cycles.university.afternoon_exit),

		other_morning: parseTimeRange(formData.school_cycles.other.morning_entry, formData.school_cycles.other.morning_exit),
		other_afternoon: parseTimeRange(formData.school_cycles.other.afternoon_entry, formData.school_cycles.other.afternoon_exit),

	};

	return Object.values(parsedData);

	//
}
