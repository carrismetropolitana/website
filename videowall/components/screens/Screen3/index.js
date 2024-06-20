'use client';

/* * */

import Columns from '@/components/layout/Columns';
import ScreenWrapper from '@/components/layout/ScreenWrapper';
import getOperationalDateStringForCurrentMonth from '@/services/getOperationalDateStringForCurrentMonth';
import { BarChart } from '@mantine/charts';
import { useMemo } from 'react';
import useSWR from 'swr';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const currentMonthDateRange = getOperationalDateStringForCurrentMonth();

	//
	// B. Fetch data

	const { data: currentMonthPaxCmData, isLoading: currentMonthPaxCmLoading, isValidating: currentMonthPaxCmValidating } = useSWR(`/api/cm/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	const { data: currentMonthPax41Data, isLoading: currentMonthPax41Loading, isValidating: currentMonthPax41Validating } = useSWR(`/api/41/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	const { data: currentMonthPax42Data, isLoading: currentMonthPax42Loading, isValidating: currentMonthPax42Validating } = useSWR(`/api/42/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	const { data: currentMonthPax43Data, isLoading: currentMonthPax43Loading, isValidating: currentMonthPax43Validating } = useSWR(`/api/43/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	const { data: currentMonthPax44Data, isLoading: currentMonthPax44Loading, isValidating: currentMonthPax44Validating } = useSWR(`/api/44/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	//
	// A. Render components

	return (
		<ScreenWrapper>
			<Columns cols={1}>
				<BarChart
					dataKey="label"
					h={350}
					data={currentMonthPaxCmData?.data || [
						{ label: 'January', value: 1 },
						{ label: 'February', value: 1 },
						{ label: 'March', value: 1 },
						{ label: 'April', value: 1 },
						{ label: 'May', value: 1 },
						{ label: 'June', value: 1 },
					]}
					series={[
						{ color: 'yellow.6', name: 'value' },
					]}
				/>
			</Columns>
			<Columns cols={2}>
				<BarChart
					dataKey="label"
					h={250}
					data={currentMonthPax41Data?.data || [
						{ label: 'January', value: 1 },
						{ label: 'February', value: 1 },
						{ label: 'March', value: 1 },
						{ label: 'April', value: 1 },
						{ label: 'May', value: 1 },
						{ label: 'June', value: 1 },
					]}
					series={[
						{ color: 'blue.6', name: 'value' },
					]}
				/>
				<BarChart
					dataKey="label"
					h={250}
					data={currentMonthPax42Data?.data || [
						{ label: 'January', value: 1 },
						{ label: 'February', value: 1 },
						{ label: 'March', value: 1 },
						{ label: 'April', value: 1 },
						{ label: 'May', value: 1 },
						{ label: 'June', value: 1 },
					]}
					series={[
						{ color: 'red.6', name: 'value' },
					]}
				/>
				<BarChart
					dataKey="label"
					h={250}
					data={currentMonthPax43Data?.data || [
						{ label: 'January', value: 1 },
						{ label: 'February', value: 1 },
						{ label: 'March', value: 1 },
						{ label: 'April', value: 1 },
						{ label: 'May', value: 1 },
						{ label: 'June', value: 1 },
					]}
					series={[
						{ color: 'violet.6', name: 'value' },
					]}
				/>
				<BarChart
					dataKey="label"
					h={250}
					data={currentMonthPax44Data?.data || [
						{ label: 'January', value: 1 },
						{ label: 'February', value: 1 },
						{ label: 'March', value: 1 },
						{ label: 'April', value: 1 },
						{ label: 'May', value: 1 },
						{ label: 'June', value: 1 },
					]}
					series={[
						{ color: 'violet.6', name: 'value' },
					]}
				/>
			</Columns>
		</ScreenWrapper>
	);

	//
}
