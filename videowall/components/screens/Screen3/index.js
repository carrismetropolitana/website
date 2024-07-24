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
					bigNumber="0.012%"
					comparison="10487"
					endDate="2024-06-30T23:59:59"
					isLoading={false}
					isValidating={false}
					level={1}
					startDate="2024-01-01T00:00:00"
					// timestamp="Agora"
					title="Percentagem de Reclamações por Total de Passageiros Transportados"
				/>
			</Columns>
			<Columns cols={2}>
				<CardSummaryFixed
					bigNumber="-1%"
					comparison="-1"
					endDate="2024-06-30T23:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-01-01T00:00:00"
					// timestamp="Agora"
					title="Área 1 / Reclamações por Total de Passageiros"
				/>
				<CardSummaryFixed
					bigNumber="-1%"
					comparison="-1"
					endDate="2024-06-30T23:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-01-01T00:00:00"
					// timestamp="Agora"
					title="Área 2 / Reclamações por Total de Passageiros"
				/>
				<CardSummaryFixed
					bigNumber="-1%"
					comparison="-1"
					endDate="2024-06-30T23:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-01-01T00:00:00"
					// timestamp="Agora"
					title="Área 3 / Reclamações por Total de Passageiros"
				/>
				<CardSummaryFixed
					bigNumber="-1%"
					comparison="-1"
					endDate="2024-06-30T23:59:59"
					isLoading={false}
					isValidating={false}
					level={2}
					startDate="2024-01-01T00:00:00"
					// timestamp="Agora"
					title="Área 4 / Reclamações por Total de Passageiros"
				/>
			</Columns>
		</ScreenWrapper>
	);

	//
}
