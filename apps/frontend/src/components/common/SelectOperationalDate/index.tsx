'use client';

/* * */

import { useLocaleContext } from '@/contexts/Locale.context';
import { useOperationalDateContext } from '@/contexts/OperationalDate.context';
import { SegmentedControl, Tooltip } from '@mantine/core';
import { DatePickerInput, DatePickerProps } from '@mantine/dates';
import { IconCalendarEvent } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

function getOffsetDate(date, offsetDays) {
	const newDate = new Date(date);
	newDate.setDate(newDate.getDate() + offsetDays);
	return { day: newDate.getDate(), month: (newDate.getMonth() + 1) };
}

function getMobileHolidays(year) {
	// probably going down a rabbit hole with this one

	// Finds Easter's day/month from a given year
	const f = Math.floor;
	const G = year % 19;
	const C = f(year / 100);
	const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
	const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
	const J = (year + f(year / 4) + I + 2 - C + f(C / 4)) % 7;
	const L = I - J;
	const month = 3 + f((L + 40) / 44);
	const day = L + 28 - 31 * f(month / 4);

	const date = new Date(year, month - 1, day);

	return { carnival: getOffsetDate(date, -47), corpusChristi: getOffsetDate(date, 60), easter: { day: day, month: month }, goodFriday: getOffsetDate(date, -2) };
}

function checkHoliday(calendarDate: dayjs.Dayjs): [boolean, string, string] {
	const day = calendarDate.date();
	const month = calendarDate.month() + 1;
	const year = calendarDate.year();

	if (day === 25 && month === 12) return [true, 'christmasHoliday', 'publicHolidayNames.christmas']; // 25/12 | Christmas / Natal
	if (day === 8 && month === 12) return [true, 'publicHoliday', 'publicHolidayNames.imaculadaConceicao']; // 08/12 | Dia da Imaculada Conceição
	if (day === 1 && month === 12) return [true, 'publicHoliday', 'publicHolidayNames.restauracaoIndependencia']; // 01/12 | Dia da Restauração da Independência
	if (day === 1 && month === 11) return [true, 'publicHoliday', 'publicHolidayNames.todosOsSantos']; // 01/11 | Dia de Todos os Santos
	if (day === 5 && month === 10) return [true, 'publicHoliday', 'publicHolidayNames.implatacaoRepublica']; // 05/10 | Dia da Implatação da República
	if (day === 15 && month === 8) return [true, 'publicHoliday', 'publicHolidayNames.assuncaoNossaSenhora']; // 15/08 | Dia da Assunção de Nossa Senhora
	if (day === 10 && month === 6) return [true, 'publicHoliday', 'publicHolidayNames.diaDePortugal']; // 10/06 | Dia de Portugal, Camões e das comunidades Portuguesas
	if (day === 1 && month === 5) return [true, 'publicHoliday', 'publicHolidayNames.diaDoTrabalhador']; // 01/05 | Dia do Trabalhador
	if (day === 25 && month === 4) return [true, 'publicHoliday', 'publicHolidayNames.diaDaLiberdade']; // 25/04 | Dia da Liberdade (25 de ABril)
	if (day === 1 && month === 1) return [true, 'publicHoliday', 'publicHolidayNames.newYears']; // 01/01 | New Years Day / Ano Novo

	// mobile holidays here we go - Easter, Sexta-Feira Santa, Carnaval and Corpo de Deus
	const mobileHolidays = getMobileHolidays(year);

	if (day === mobileHolidays.easter.day && month === mobileHolidays.easter.month) return [true, 'easterHoliday', 'publicHolidayNames.easter'];
	if (day === mobileHolidays.carnival.day && month === mobileHolidays.carnival.month) return [true, 'publicHoliday', 'publicHolidayNames.carnival'];
	if (day === mobileHolidays.corpusChristi.day && month === mobileHolidays.corpusChristi.month) return [true, 'publicHoliday', 'publicHolidayNames.corpusChristi'];
	if (day === mobileHolidays.goodFriday.day && month === mobileHolidays.goodFriday.month) return [true, 'publicHoliday', 'publicHolidayNames.goodFriday'];

	return [false, '', ''];
}

export const dayRenderer: DatePickerProps['renderDay'] = (date) => {
	const t = useTranslations('common.SelectOperationalDate');

	const calendarDate = dayjs(date);
	const day = calendarDate.date();
	const year = calendarDate.year();
	const isHoliday = checkHoliday(calendarDate);
	if (isHoliday[0]) {
		return (
			<Tooltip
				events={{ focus: true, hover: true, touch: true }}
				label={t(isHoliday[2], { year: year })}
				withArrow
			>
				<div className={isHoliday[0] ? styles.publicHoliday : ''}>
					{t(isHoliday[1])}
				</div>
			</Tooltip>
		);
	}
	else {
		return (
			day
		);
	}
};

/* * */
export function SelectOperationalDate() {
	//

	//
	// A. Setup variables

	// The current dates endpoint is missing some holidays (i.e. Easter 2026). As such, it can't be used until these issues are fixed. Addtionally, this endpoint "only" returns dates up to 2029
	// const { data: operationalDates } = useSWR<ApiOperationalDate[]>(`${getPublicVariable('api_url')}/dates`, { refreshInterval: 900000 });

	const t = useTranslations('common.SelectOperationalDate');
	const operationalDateContext = useOperationalDateContext();

	const [selectedSegmentedControlOption, setSelectedSegmentedControlOption] = useState<string | undefined>();

	const segementedControlOptions = [
		{
			label: t('today'),
			value: 'today',
		},
		{
			label: t('tomorrow'),
			value: 'tomorrow',
		},
		{
			label: (
				<DatePickerInput
					classNames={{ input: styles.datePickerInput, section: styles.datePickerSection, wrapper: styles.datePickerWrapper }}
					data-selected={!operationalDateContext.flags.is_today_selected && !operationalDateContext.flags.is_tomorrow_selected}
					dropdownType="modal"
					leftSection={<IconCalendarEvent />}
					locale={useLocaleContext().data.current_locale || 'pt'}
					onChange={operationalDateContext.actions.updateSelectedDateFromFormat}
					renderDay={dayRenderer}
					size="lg"
					value={operationalDateContext.data.selected_date?.js_date}
					valueFormat="DD MMM YYYY"
					variant="unstyled"
				/>
			),
			value: 'custom_date',
		},
	];

	//
	// B. Transform data

	useEffect(() => {
		if (operationalDateContext.flags.is_today_selected) {
			setSelectedSegmentedControlOption('today');
		}
		else if (operationalDateContext.flags.is_tomorrow_selected) {
			setSelectedSegmentedControlOption('tomorrow');
		}
		else if (!operationalDateContext.flags.is_today_selected && !operationalDateContext.flags.is_tomorrow_selected) {
			setSelectedSegmentedControlOption('custom_date');
		}
	}, [operationalDateContext.flags.is_today_selected, operationalDateContext.flags.is_tomorrow_selected]);

	//
	// C. Handle actions

	const handleSegmentedControlChange = (value: string) => {
		if (value === 'today') {
			operationalDateContext.actions.updateSelectedDateToToday();
		}
		else if (value === 'tomorrow') {
			operationalDateContext.actions.updateSelectedDateToTomorrow();
		}
	};

	//
	// D. Render components

	return (
		<SegmentedControl
			data={segementedControlOptions}
			onChange={handleSegmentedControlChange}
			value={selectedSegmentedControlOption}
			w="100%"
			classNames={{
				control: styles.segmentedControlDateInputOverrideControl,
				label: styles.segmentedControlDateInputOverrideLabel,
			}}
		/>
	);

	//
}
