/* * */

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { BrandsMunicipalities } from '@/settings/assets.settings';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

const municipalDiscounts = [
	{
		description: 'A Câmara Municipal de Setúbal oferece, a todos os seus munícipes, 10€ de desconto sobre o valor do navegante® municipal Setúbal. Esta benece é cumulativa com outros descontos.',
		icon: BrandsMunicipalities.setubal,
		name: 'CM Setúbal',
		validity: new Date('2022-12-31').toLocaleDateString(),
	},
	{
		description: 'A Câmara Municipal de Lisboa oferece o passe navegante® Lisboa a todos os munícipes com 65 ou mais anos de idade.',
		icon: BrandsMunicipalities.lisboa,
		name: 'CM Lisboa',
		validity: 'active',
	},
];

/* * */

export default function Component() {
	return (
		<Surface>
			<Section heading="Descontos Municipais" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withPadding>
				<Grid columns="abc" withGap>
					{municipalDiscounts.map((discount, index) => (
						<Card key={index}>
							<CardHeader>
								<div className={styles.cardImageWrapper}>
									<Image alt={discount.name} className={styles.cardImage} src={discount.icon} />
								</div>
							</CardHeader>
							<CardContent>
								<CardTitle>{discount.name}</CardTitle>
								<CardDescription>{discount.description}</CardDescription>
							</CardContent>
							<CardFooter>
								<p className={styles.validity}>
									{discount.validity === 'active' ? 'Válido' : 'Válido até ' + discount.validity}
								</p>
							</CardFooter>
						</Card>
					))}
				</Grid>
			</Section>
		</Surface>
	);
}
