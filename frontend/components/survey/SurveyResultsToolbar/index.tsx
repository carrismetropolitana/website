'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { RangeSlider, Select, TextInput } from '@mantine/core';
import { IconFilter, IconSearch, IconX } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

/* * */

export function SurveyResultsToolbar({ handleSearch }) {
	// A. Setup variables
	const [avaliationValue, setAvalitaionValue] = useState<null | string>(null);
	const [category, setCategory] = useState<null | string>(null);
	const [search, setSearch] = useState<null | string>(null);
	const t = useTranslations('survey.SurveyResultsToolbar');

	const filterCategories = [
		{ label: 'Paragens', value: 'info_stops' },
		{ label: 'Rede', value: 'info_rede' },
		{ label: 'Autocarros', value: 'info_bus' },
		{ label: 'Suporte', value: 'info_support' },
	];

	const marks = Array.from({ length: 11 }, (_, i) => ({ label: `${i}`, value: i }));

	// B. Handle Actions
	const handleAvaliationValue = (value: [number, number]) => {
		setAvalitaionValue(JSON.stringify(value));
	};

	useEffect(() => {
		handleSearch(search, category, avaliationValue);
	}, [search, category, avaliationValue]);

	// C. Render components
	return (
		<Section withPadding>
			<Grid columns="abc" withGap>
				<TextInput
					leftSection={<IconSearch size={20} />}
					onChange={e => setSearch(e.target.value)}
					placeholder={t('searchInput')}
					type="search"
					value={search || ''}
					w="100%"
					rightSection={
						search && (
							<IconX
								cursor="pointer"
								onClick={() => setSearch(null)}
								size={20}
							/>
						)
					}
				/>
				<Select
					data={filterCategories}
					leftSection={<IconFilter size={20} />}
					onChange={value => setCategory(value)}
					onClear={() => setCategory(null)}
					placeholder={t('by_category')}
					value={category}
					w="100%"
					clearable
				/>
				<div className={styles.custom_slider_container}>
					<p>{t('by_avaliation')}</p>
					<RangeSlider
						color="#ffdd01"
						defaultValue={[0, 10]}
						marks={marks}
						max={10}
						min={0}
						minRange={0.1}
						onChange={handleAvaliationValue}
						step={0.1}
						value={avaliationValue ? JSON.parse(avaliationValue) : [0, 10]}
						w="100%"
						classNames={{
							mark: styles.custom_slider_mark,
							thumb: styles.custom_slider_thumb,
						}}
					/>
				</div>
			</Grid>
		</Section>
	);
}
