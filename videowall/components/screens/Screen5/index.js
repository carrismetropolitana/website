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

	// const { data: currentMonthPax41Data, isLoading: currentMonthPax41Loading, isValidating: currentMonthPax41Validating } = useSWR(`/api/41/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	// const { data: currentMonthPax42Data, isLoading: currentMonthPax42Loading, isValidating: currentMonthPax42Validating } = useSWR(`/api/42/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	// const { data: currentMonthPax43Data, isLoading: currentMonthPax43Loading, isValidating: currentMonthPax43Validating } = useSWR(`/api/43/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	// const { data: currentMonthPax44Data, isLoading: currentMonthPax44Loading, isValidating: currentMonthPax44Validating } = useSWR(`/api/44/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	//
	// A. Render components

	return (
		<ScreenWrapper>
			<Columns cols={1}>
				<BarChart
					data={currentMonthPaxCmData?.data || []}
					h={300}
				/>
			</Columns>
		</ScreenWrapper>
	);

	//
}
