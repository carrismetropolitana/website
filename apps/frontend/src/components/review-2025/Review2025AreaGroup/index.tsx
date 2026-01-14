/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { areaData } from '@/components/review-2025/_data/cards';

import styles from './styles.module.css';

import Review2025Card from '../Review2025Card';

/* * */

export function Review2025AreaGroup() {
	//
	return (
		<Surface forceOverflow>
			<Section withPadding="desktop" withGap>
				<div className={styles.headingWrapper}>
					<h2 className={styles.heading}>Áreas</h2>
					<h5 className={styles.subheading}>Áreas de atuação da Carris Metropolitana</h5>
				</div>
			</Section>
			<Section withGap withPadding>
				<Grid columns="abc" withGap>
					{areaData.map((data, index) => <Review2025Card key={index} data={data} />)}
				</Grid>
			</Section>
		</Surface>
	);
	//
}
