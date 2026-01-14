'use client';

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { amlData, areaData, municipalityData, terminalsData } from '@/components/review-2025/_data/cards';

import styles from './styles.module.css';

import Review2025Card from '../Review2025Card';

/* * */

/* * */

export function Review2025Page() {
	//

	//
	// A. Setup variables

	//
	// B. Render components

	return (
		<>
			<Section heading="Retroespectiva 2025" withGap withPadding>
				{/* AM - LIST OF CARDS */}
				<Surface forceOverflow>
					<Grid columns="abc" withGap>
						{amlData.map((data, index) => <Review2025Card key={index} data={data} />)}
					</Grid>
				</Surface>
				{/* AM - LIST OF CARDS */}
				<Surface forceOverflow>
					<Grid columns="abb">
						{areaData.map((data, index) => <Review2025Card key={index} data={data} />)}
					</Grid>
				</Surface>
				{/* AM - LIST OF CARDS */}
				<Surface forceOverflow>
					<Grid columns="abb">
						{municipalityData.map((data, index) => <Review2025Card key={index} data={data} />)}
					</Grid>
				</Surface>
				{/* AM - LIST OF CARDS */}
				<Surface forceOverflow>
					<Grid columns="abb">
						{terminalsData.map((data, index) => <Review2025Card key={index} data={data} />)}
					</Grid>
				</Surface>
			</Section>
		</>
	);

	//
}
