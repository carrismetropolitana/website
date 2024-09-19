'use client';

/* * */

import CardSummaryFixed from '@/components/cards/CardSummaryFixed';
import Clock from '@/components/clock';
import Columns from '@/components/layout/Columns';
import ScreenWrapper from '@/components/layout/ScreenWrapper';

import styles from './styles.module.css';

/* * */

export default function Screen1() {
	return (
		<ScreenWrapper>
			<Columns cols={1}>
				<CardSummaryFixed
					bigNumber="0,012%"
					comparison="10 487"
					endDate="2024-06-30T23:59:59"
					isLoading={false}
					isValidating={false}
					level={1}
					startDate="2024-01-01T00:00:00"
					// timestamp="Agora"
					title="Percentagem de Reclamações por Total de Passageiros Transportados"
				/>
			</Columns>
			{/* <Columns cols={2}>
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
			</Columns> */}
			<div className={styles.logo}>
				<Clock />
				<img alt="Screen4" src="/portugal2020.jpg" />
			</div>
		</ScreenWrapper>
	);
}
