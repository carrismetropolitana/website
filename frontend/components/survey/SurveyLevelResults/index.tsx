'use client';

/* * */

import { Grid } from '@/components/layout/Grid';
import { NoDataLabel } from '@/components/layout/NoDataLabel';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { allResultsCardData, SurveryResultsCardSchema } from '@/components/survey/_data/Results/cards';
import { SurveyResultCard } from '@/components/survey/SurveyResultCard';
import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { Accordion, AccordionControl } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { SurveyResultsInfoAccordion } from '../SurveyResultsInfoAccordion';
import { SurveyResultsToolbar } from '../SurveyResultsToolbar';
import styles from './styles.module.css';

/* * */

export function SurveyLevelResults() {
	//

	//
	// A. Setup variables
	const anaylticsContext = useAnalyticsContext();
	const t = useTranslations('survey.SurveyResultsCard');
	const [filteredData, setFilteredData] = useState<SurveryResultsCardSchema[]>(allResultsCardData);
	// B . Fetch Data
	const allData = allResultsCardData;
	const allPublicInfoData = allData.filter(item => item._group === 'info_ao_publico').sort((a, b) => parseFloat(b.header.value.replace(',', '.')) - parseFloat(a.header.value.replace(',', '.')));
	const allNetworkData = allData.filter(item => item._group === 'info_rede').sort((a, b) => parseFloat(b.header.value.replace(',', '.')) - parseFloat(a.header.value.replace(',', '.')));
	const allStopsData = allData.filter(item => item._group === 'info_stops').sort((a, b) => parseFloat(b.header.value.replace(',', '.')) - parseFloat(a.header.value.replace(',', '.')));
	const allBusData = allData.filter(item => item._group === 'info_bus').sort((a, b) => parseFloat(b.header.value.replace(',', '.')) - parseFloat(a.header.value.replace(',', '.')));
	const allSupportData = allData.filter(item => item._group === 'info_support').sort((a, b) => parseFloat(b.header.value.replace(',', '.')) - parseFloat(a.header.value.replace(',', '.')));
	const allAccordions = [
		{
			data: allPublicInfoData,
			label: 'Público',
			value: 'public-info-cards',
		},
		{
			data: allNetworkData,
			label: 'Rede',
			value: 'network-cards',
		},
		{
			data: allStopsData,
			label: 'Paragens',
			value: 'stops-cards',
		},
		{
			data: allBusData,
			label: 'Autocarros',
			value: 'bus-cards',
		},
		{
			data: allSupportData,
			label: 'Suporte',
			value: 'support-cards',
		},
	];
	//
	// C. Handle Actions
	const handleFilterData = (search: string, category: string, avaliationValue: string) => {
		let filteredResults = allData;
		if (search) {
			filteredResults = filteredResults.filter(item => item.content.description.toLowerCase().includes(search.toLowerCase()));
			anaylticsContext.actions.capture(ampli => ampli.survey2024FilterChanged({ filter_type: 'by_Search', filter_value: search }));
		}
		if (category) {
			filteredResults = filteredResults.filter(item => item._group.toLowerCase().includes(category.toLowerCase()));
			anaylticsContext.actions.capture(ampli => ampli.survey2024FilterChanged({ filter_type: 'by_Category', filter_value: category }));
		}
		if (avaliationValue) {
			const [min, max] = JSON.parse(avaliationValue);
			const parsedMin = parseFloat(min.toFixed(2).replace(',', '.'));
			const parsedMax = parseFloat(max.toFixed(2).replace(',', '.'));

			filteredResults = filteredResults.filter((item) => {
				const value = parseFloat(item.header.value.replace(',', '.'));
				return value >= parsedMin && value <= parsedMax;
			});
		}
		filteredResults = filteredResults.sort((a, b) => parseFloat(b.header.value.replace(',', '.')) - parseFloat(a.header.value.replace(',', '.')));
		setFilteredData(filteredResults);
		anaylticsContext.actions.captureWithDelay(ampli => ampli.survey2024FilterChanged({ filter_type: 'by_AvaliationValue', filter_value: avaliationValue }));
	};
	//
	// D. Render components

	const renderFilteredData = () => {
		return (
			<div className={styles.cardWrapper}>
				<Grid columns="abc" withGap>
					{filteredData.map((item, index) => (
						<SurveyResultCard key={index} cardData={item} />
					))}
				</Grid>
			</div>
		);
	};

	const renderFotterDescription = (accordionType: string) => {
		let footerText = '';

		switch (accordionType) {
			case 'bus-cards':
				footerText = t('footerInfoBus');
				break;
			case 'network-cards':
				footerText = t('footerInfoNetwork');
				break;
			case 'public-info-cards':
				footerText = t('footerInfoPublic');
				break;
			case 'stops-cards':
				footerText = t('footerInfoStops');
				break;
			case 'support-cards':
				footerText = t('footerInfoSupport');
				break;
			default:
				footerText = t('footerInfo');
		}

		return (
			<div className={styles.resultsFooterInfoWrapper}>
				<p className={styles.resultsFooterInfoText}>{footerText}</p>
			</div>
		);
	};

	const renderAllData = () => {
		return (
			<>
				{allAccordions.map(accordion => (
					<Accordion key={accordion.value} defaultValue={accordion.value} style={{ width: '100%' }}>
						<Accordion.Item value={accordion.value}>
							<AccordionControl>{accordion.label}</AccordionControl>
							<Accordion.Panel>
								<div className={styles.cardWrapper}>
									<Grid columns="abc" withGap>
										{accordion.data.map((item, index) => (
											<SurveyResultCard key={index} cardData={item} />
										))}
									</Grid>
									{renderFotterDescription(accordion.value)}
								</div>
							</Accordion.Panel>
						</Accordion.Item>
					</Accordion>
				))}
			</>
		);
	};

	return (
		<div id="results">
			<Surface forceOverflow>
				<Section
					heading={t('heading')}
					subheading={t('AnchorResultsSubheading')}
				>
					<SurveyResultsInfoAccordion />
					<br />
					<SurveyResultsToolbar handleSearch={handleFilterData} />
					{filteredData.length === 0 ? (
						<NoDataLabel text={t('no_data')} withMinHeight />
					) : (
						filteredData.length !== allData.length ? renderFilteredData() : renderAllData()
					)}
				</Section>
			</Surface>
		</div>
	);

	//
}
