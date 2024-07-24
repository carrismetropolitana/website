'use client';

/* * */

import CardSummaryFixed from '@/components/cards/CardSummaryFixed';
import Columns from '@/components/layout/Columns';
import ScreenWrapper from '@/components/layout/ScreenWrapper';

// import getOperationalDateStringForCurrentMonth from '@/services/getOperationalDateStringForCurrentMonth';
// import { BarChart } from '@mantine/charts';
// import { useMemo } from 'react';
// import useSWR from 'swr';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	// const currentMonthDateRange = getOperationalDateStringForCurrentMonth();

	//
	// B. Fetch data

	// const { data: currentMonthPaxCmData, isLoading: currentMonthPaxCmLoading, isValidating: currentMonthPaxCmValidating } = useSWR(`/api/cm/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	// const { data: currentMonthPax41Data, isLoading: currentMonthPax41Loading, isValidating: currentMonthPax41Validating } = useSWR(`/api/41/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	// const { data: currentMonthPax42Data, isLoading: currentMonthPax42Loading, isValidating: currentMonthPax42Validating } = useSWR(`/api/42/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	// const { data: currentMonthPax43Data, isLoading: currentMonthPax43Loading, isValidating: currentMonthPax43Validating } = useSWR(`/api/43/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	// const { data: currentMonthPax44Data, isLoading: currentMonthPax44Loading, isValidating: currentMonthPax44Validating } = useSWR(`/api/44/pax/date_range/${currentMonthDateRange.start_date}/${currentMonthDateRange.end_date}`);

	//
	// A. Render components

	return (
		<ScreenWrapper>
			<Columns cols={1}>
				<CardSummaryFixed
					bigNumber="97%"
					comparison="489 999"
					endDate="2024-07-01T03:59:59"
					isLoading={false}
					isValidating={false}
					level={1}
					startDate="2024-06-01T04:00:00"
					// timestamp="Agora"
					title="Cumprimento Serviço (TR+Bilh)"
				/>
			</Columns>
			<Columns cols={2}>
				<CardSummaryFixed
					bigNumber="97,1%"
					comparison="167 926"
					endDate="2024-07-01T03:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-06-01T04:00:00"
					// timestamp="Agora"
					title="Área 1 / Cumprimento Serviço (TR+Bilh)"
				/>
				<CardSummaryFixed
					bigNumber="93,8%"
					comparison="144 170"
					endDate="2024-07-01T03:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-06-01T04:00:00"
					// timestamp="Agora"
					title="Área 2 / Cumprimento Serviço (TR+Bilh)"
				/>
				<CardSummaryFixed
					bigNumber="98%"
					comparison="114 093"
					endDate="2024-07-01T03:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-06-01T04:00:00"
					// timestamp="Agora"
					title="Área 3 / Cumprimento Serviço (TR+Bilh)"
				/>
				<CardSummaryFixed
					bigNumber="98%"
					comparison="63 810"
					endDate="2024-07-01T03:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-06-01T04:00:00"
					// timestamp="Agora"
					title="Área 4 / Cumprimento Serviço (TR+Bilh)"
				/>
			</Columns>
		</ScreenWrapper>
	);

	//
}
