/* * */

import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { Image } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

const municipalDiscounts = [
	{
		description: 'O Passe navegante® Municipal de Setúbal, válido para as deslocações nos transportes públicos coletivos de passageiros no município, tem um desconto de dez euros, concedido pela Câmara Municipal.',
		icon: '/assets/brands/municipalities/setubal.jpg',
		id: 'setubal-001',
		name: 'Câmara Municipal de Setúbal',
		validity: 'Válido até 31 dez. 2025',
	},
	{
		description: 'A Câmara Municipal de Lisboa oferece o passe navegante® municipal Lisboa a todos os munícipes com 65 ou mais anos de idade.',
		icon: '/assets/brands/municipalities/lisboa.jpg',
		id: 'lisboa-001',
		name: 'Câmara Municipal de Lisboa',
	},
];

/* * */

export function MunicipalDiscounts() {
	//

	//
	// A. Setup variables

	const t = useTranslations('cards.MunicipalDiscounts');

	//
	// B. Render components

	return (
		<Surface>
			<Section heading={t('heading')} withPadding>
				<Grid columns="ab" withGap>
					{municipalDiscounts.map(discount => (
						<div key={discount.id}className={styles.cardWrapper}>
							<Image alt={discount.name} className={styles.cardImage} src={discount.icon} />
							<div className={styles.info}>
								<h3 className={styles.title}>{discount.name}</h3>
								<p className={styles.description}>{discount.description}</p>
								{discount.validity && <p className={styles.validity}>{discount.validity}</p>}
							</div>
						</div>
					))}
				</Grid>
			</Section>
		</Surface>
	);

	//
}
