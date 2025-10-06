/* * */

import { Section } from '@/components/layout/Section';
import { Line } from '@carrismetropolitana/api-types/network';
import { Select, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	allLines: Line[]
	filter_type: (value) => void
	filter_value: (value) => void
}

/* * */

export function MetricsPageComplaintsToolbar({ allLines, filter_type, filter_value }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageComplaintsToolbar');
	const [line, setLine] = useState(null);
	const [municipality, setMunicipality] = useState(null);
	const AML = [
		{ label: 'Alcochete', value: '1502' },
		{ label: 'Almada', value: '1503' },
		{ label: 'Amadora', value: '1115' },
		{ label: 'Barreiro', value: '1504' },
		{ label: 'Cascais', value: '1105' },
		{ label: 'Lisboa', value: '1106' },
		{ label: 'Loures', value: '1107' },
		{ label: 'Mafra', value: '1109' },
		{ label: 'Moita', value: '1506' },
		{ label: 'Montijo', value: '1507' },
		{ label: 'Odivelas', value: '1116' },
		{ label: 'Oeiras', value: '1110' },
		{ label: 'Palmela', value: '1508' },
		{ label: 'Seixal', value: '1510' },
		{ label: 'Setúbal', value: '1512' },
		{ label: 'Sintra', value: '1111' },
		{ label: 'Vila Franca de Xira', value: '1114' },
	];

	//
	// B. Handle actions

	const handleLineChange = (value) => {
		if (municipality) {
			setMunicipality(null);
		}
		if (value === '-') {
			filter_type('global');
			filter_value(value);
			setLine(null);
		}
		else {
			filter_type('line');
			filter_value(value);
			setLine(value);
		}
	};

	const handleMunicipalityChange = (value) => {
		if (line) {
			setLine(null);
		}
		if (value === '-') {
			filter_type('global');
			filter_value(value);
			setMunicipality(null);
		}
		else {
			filter_type('municipality');
			filter_value(value);
			setMunicipality(value);
		}
	};

	//
	// C. Render components

	return (
		<Section>
			<Text className={styles.toolbarDescription}>{t('toolbar_desc')}</Text>
			<div className={styles.toolbarContainer}>
				<Select
					data={allLines.map(item => ({ label: `${item.id} - ${item.long_name}`, value: item.id }))}
					onChange={_value => handleLineChange(_value)}
					onClear={() => handleLineChange('-')}
					placeholder={t('line')}
					value={line}
					clearable
					searchable
				/>
				<Select
					data={AML.map(item => ({ label: item.label, value: item.value }))}
					onChange={_value => handleMunicipalityChange(_value)}
					onClear={() => handleMunicipalityChange('-')}
					placeholder={t('municipality')}
					value={municipality}
					clearable
					searchable
				/>
			</div>
		</Section>
	);

	//
}
