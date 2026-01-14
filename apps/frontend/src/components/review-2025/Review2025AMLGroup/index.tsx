/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { amlData } from '@/components/review-2025/_data/cards';

import styles from './styles.module.css';

import Review2025Card from '../Review2025Card';

/* * */

export function Review2025AMLGroup() {
	//
	return (
		<Surface forceOverflow>
			<Section withPadding="desktop" withGap>
				<div className={styles.headingWrapper}>
					<h2 className={styles.heading}>Área Metropolitana de Lisboa</h2>
					<h5 className={styles.subheading}>Evolução da operação na Área Metropolitana de Lisboa em 2025</h5>
				</div>
			</Section>
			<Section withGap withPadding>
				<Grid columns="abc" withGap>
					{amlData.map((data, index) => <Review2025Card key={index} data={data} />)}
				</Grid>
			</Section>
		</Surface>
	);
	//
}
