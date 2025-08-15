import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesContext } from '@/contexts/Lines.context';
import { Accordion, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import styles from './styles.module.css';

import { ArrabidaMap } from '../ArrabidaMap';

interface StopData {
	lineIds: string[]
	name: string
}

interface DestinationData {
	id: string
	stops: StopData[]
	title: string
}

export function ArrabidaWay() {
	//
	// A. Setup variables

	const t = useTranslations('arrabida.ArrabidaWay');
	const linesContext = useLinesContext();
	const [openSections, setOpenSections] = useState<string>('praia-albarquel');
	const [selectedLineId, setSelectedLineId] = useState<null | string>(null);

	// Destinations data based on the spreadsheet - now using line IDs
	const destinationsData: DestinationData[] = [
		{
			id: 'praia-albarquel',
			stops: [
				{
					lineIds: ['4474', '4414', '4415', '4471'],
					name: 'Albarquel (N10-4)',
				},
				{
					lineIds: ['4471', '4414'],
					name: 'Praia Albarquel',
				},
				{
					lineIds: ['4415', '4474'],
					name: 'Setúbal (ITS)',
				},
				{
					lineIds: ['4474'],
					name: 'Setúbal (Centro Comercial)',
				},
			],
			title: 'Praia de Albarquel',
		},
		{
			id: 'praia-figueirinha',
			stops: [
				{
					lineIds: ['4474'],
					name: 'Outão X',
				},
				{
					lineIds: ['4474'],
					name: 'Praia da Figueirinha',
				},
			],
			title: 'Praia da Figueirinha',
		},
		{
			id: 'praia-galapos-galapinhos',
			stops: [
				{
					lineIds: ['4477'],
					name: 'Praia dos Galápos',
				},
				{
					lineIds: ['4477'],
					name: 'Praia dos Galápos (acesso Pedonal)',
				},
				{
					lineIds: ['4477'],
					name: 'Frente Praia dos Galapinhos',
				},
			],
			title: 'Praia dos Galápos e Galapinhos',
		},
		{
			id: 'praia-creiro',
			stops: [
				{
					lineIds: ['4470', '4477'],
					name: 'Praia do Creiro (Parque de Estacionamento)',
				},
				{
					lineIds: ['4477'],
					name: 'Praia do Creiro',
				},
				{
					lineIds: ['4470'],
					name: 'Setúbal (ITS)',
				},
			],
			title: 'Praia do Creiro',
		},
	];

	//
	// B. Handle actions

	const handleAccordionChange = (value: string) => {
		setOpenSections(value);
	};

	const handleLineClick = (lineId: string) => {
		setSelectedLineId(lineId);
	};

	//
	// C. Render components

	return (
		<div id="how-to-get">
			<Surface>
				<Section heading={t('title')} subheading={t('subtitle')} withGap withPadding>
					<div className={styles.container}>
						{/* Map Section */}
						<div className={styles.mapContainer}>
							<ArrabidaMap
								onPinClick={handleAccordionChange}
								selectedAccordionId={openSections}
								selectedLineId={selectedLineId}
							/>
						</div>

						{/* Journey Steps Section */}
						<div className={styles.journeyContainer}>
							<Accordion
								className={styles.accordion}
								defaultValue="praia-albarquel"
								onChange={handleAccordionChange}
								value={openSections}
							>
								{destinationsData.map(destination => (
									<Accordion.Item key={destination.id} className={styles.accordionItem} value={destination.id}>
										<Accordion.Control className={styles.accordionControl}>
											<Text className={styles.stepTitle}>{destination.title}</Text>
										</Accordion.Control>
										<Accordion.Panel className={styles.accordionPanel}>
											{destination.stops.map((stop, stopIndex) => (
												<div key={stopIndex} className={styles.linesWrapper}>
													<span>{stop.name}</span>
													{stop.lineIds.map((lineId, lineIndex) => {
														const lineData = linesContext.actions.getLineDataById(lineId);

														return (
															<div
																key={lineIndex}
																className={styles.lineItem}
																onClick={() => handleLineClick(lineId)}
																style={{
																	borderRadius: '8px',
																	cursor: 'pointer',
																	padding: '8px',
																}}
															>
																<LineDisplay lineData={lineData} />
															</div>
														);
													})}
												</div>
											))}
										</Accordion.Panel>
									</Accordion.Item>
								))}
							</Accordion>
						</div>
					</div>
				</Section>
			</Surface>
		</div>
	);

	//
}
