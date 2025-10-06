/* * */

import { MetricsComplaintsPageCardGroupCard } from '@/components/metrics/MetricsPageComplaintsCardGroupCard';
import { ComplaintMetrics } from '@carrismetropolitana/api-types/metrics';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	data: ComplaintMetrics[]
	filter_type: string
	filter_value: string
	last_update?: string
	lineColor?: string
	municipalityName?: string
	totalPassengersLastWeek?: number
	totalPassengersLastWeekLineId?: number
	totalPassengersLastYear?: number
}

/* * */

export function MetricsComplaintsPageCardGroup({ data, filter_type, filter_value, last_update, lineColor, municipalityName, totalPassengersLastWeek, totalPassengersLastWeekLineId, totalPassengersLastYear }: Props) {
	//

	//
	// A. Setup variables

	const filteredData = useMemo(() => {
		return data.filter(item => item.filter_value === filter_value && item.type === filter_type);
	}, [data, filter_type, filter_value]);

	const totalInfoRequests = useMemo(() => {
		return filteredData.reduce((acc, item) => acc + item.info_requests, 0);
	}, [filteredData]);

	const totalComplaints = useMemo(() => {
		return filteredData.reduce((acc, item) => acc + item.complaints, 0);
	}, [filteredData]);

	const totalOther = useMemo(() => {
		return filteredData.reduce((acc, item) => acc + item.other, 0);
	}, [filteredData]);

	const lastUpdate = last_update ? DateTime.fromISO(last_update).toFormat('dd-MM-yyyy') : null;
	//
	// B. Fetch data

	// const calcPercentage = (value: number, total: number) => {
	// 	return `${((value / total) * 100).toFixed(2)}%`;
	// };

	const calcPercentageMunicipality = (value: number, total: number) => {
		return total > 0 ? `${((value / total) * 100).toFixed(3)}%` : '0.00%';
	};

	const createCardData = (description1: string, value: number, image: string, title: string, footer?: string) => {
		let description2: string | undefined;
		let description3: string | undefined;

		if (filter_type !== 'global') {
			// Add data de atualização on desc 3
			description2 = '';
			description3 = last_update ? `Última atualização: ${lastUpdate}` : 'Sem data de atualização';
		}
		else if (filter_type === 'global') {
			description2 = calcPercentageMunicipality(value, totalPassengersLastYear || 0);
			description3 = ' do total de passageiros transportados no ultimo ano';
		}

		return {
			description1,
			description2,
			description3,
			filter_value,
			footer,
			image,
			line_color: lineColor,
			municipality_name: municipalityName,
			subheading: filter_type,
			title,
			value,
		};
	};

	const cardData = useMemo(() => [
		createCardData('pedidos de informação', totalInfoRequests, '/assets/complaints/pedidos_info.svg', 'Pedidos de Informação'),
		createCardData('total de reclamações', totalComplaints, '/assets/complaints/reclamacoes_info.svg', 'Reclamações'),
		createCardData('total de outro* tipo de contactos', totalOther, '/assets/complaints/outros_info.svg', 'Outros*', '*perdidos e achados, sugestões e agradecimentos'),
	], [totalInfoRequests, totalComplaints, totalOther, totalPassengersLastWeek, totalPassengersLastWeekLineId, filter_value, filter_type, lineColor, municipalityName]);

	// C. Render components

	return (
		<div className={styles.container}>
			{cardData.map((card, index) => (
				<MetricsComplaintsPageCardGroupCard
					key={index}
					description1={card.description1}
					description2={card.description2}
					description3={card.description3}
					filter_value={filter_value}
					footer={card.footer}
					image={card.image}
					line_color={card.line_color}
					municipality_name={card.municipality_name}
					subheading={card.subheading}
					title={card.title}
					value={card.value}
				/>
			))}
		</div>
	);

	//
}
