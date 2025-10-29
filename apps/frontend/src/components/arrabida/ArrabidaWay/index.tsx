import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { InactiveLineDisplay } from '@/components/lines/InactiveLineDisplay';
import { LineDisplay } from '@/components/lines/LineDisplay';
import { useLinesContext } from '@/contexts/Lines.context';
import { Accordion, Text } from '@mantine/core';
import { IconArrowNarrowRight } from '@tabler/icons-react';
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
					lineIds: ['4474'],
					name: '11. Setúbal (Centro Comercial)',
				},
				{
					lineIds: ['4415', '4474'],
					name: '10. Setúbal (ITS)',
				},
				{
					lineIds: ['4474', '4414', '4415', '4471'],
					name: '1. Albarquel (N10-4)',
				},
				{
					lineIds: ['4471', '4414'],
					name: '2. Praia Albarquel',
				},

			],
			title: 'Praia de Albarquel',
		},
		{
			id: 'praia-figueirinha',
			stops: [
				{
					lineIds: ['4474'],
					name: '3. Outão X',
				},
				{
					lineIds: ['4474'],
					name: '4. Praia da Figueirinha',
				},
			],
			title: 'Praia da Figueirinha',
		},
		{
			id: 'praia-galapos-galapinhos',
			stops: [
				{
					lineIds: ['4477'],
					name: '5. Praia dos Galápos',
				},
				{
					lineIds: ['4477'],
					name: '6. Praia dos Galápos (acesso Pedonal)',
				},
				{
					lineIds: ['4477'],
					name: '7. Frente Praia dos Galapinhos',
				},
			],
			title: 'Praia dos Galápos e Galapinhos',
		},
		{
			id: 'praia-creiro',
			stops: [
				{
					lineIds: ['4470', '4477'],
					name: '8. Praia do Creiro (Parque de Estacionamento)',
				},
				{
					lineIds: ['4477'],
					name: '9. Praia do Creiro',
				},
				{
					lineIds: ['4470'],
					name: '10. Setúbal (ITS)',
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
														const isLoading = linesContext.flags.is_loading;
														const isLineActive = lineData !== undefined;

														// Show skeleton while loading
														if (isLoading) {
															return (
																<div
																	key={lineIndex}
																	className={styles.lineItem}
																>
																	<LineDisplay />
																	<div className={styles.arrowWrapper}>
																		<IconArrowNarrowRight size={20} />
																	</div>
																</div>
															);
														}

														// Show inactive component if line not found after loading
														if (!isLineActive) {
															return (
																<div key={lineIndex} className={styles.lineItemInactive}>
																	<InactiveLineDisplay lineId={lineId} message={t('inactive_line_message')} />
																</div>
															);
														}

														// Show active line
														return (
															<div
																key={lineIndex}
																className={styles.lineItem}
																onClick={() => handleLineClick(lineId)}
															>
																<LineDisplay lineData={lineData} />
																<div className={styles.arrowWrapper}>
																	<IconArrowNarrowRight size={20} />
																</div>
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
