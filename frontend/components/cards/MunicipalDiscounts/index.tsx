/* * */

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/common/Card';
import Section from '@/components/layout/Section';
import { ImagesMunicipality } from '@/utils/assets';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

const municipalDiscounts = [
	{
		description: 'A Câmara Municipal de Setúbal oferece, a todos os seus munícipes, 10€ de desconto sobre o valor do navegante® municipal Setúbal. Esta benece é cumulativa com outros descontos.',
		icon: ImagesMunicipality.MUNICIPALITY_SETUBAL,
		name: 'CM Setúbal',
		validity: new Date('2022-12-31').toLocaleDateString(),
	},
	{
		description: 'A Câmara Municipal de Lisboa oferece o passe navegante® Lisboa a todos os munícipes com 65 ou mais anos de idade.',
		icon: ImagesMunicipality.MUNICIPALITY_LISBOA,
		name: 'CM Lisboa',
		validity: 'active',
	},
];

export default function Component() {
	return (
		<Section heading="Descontos Municipais" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withChildrenPadding>
			<div className={styles.content}>
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
			</div>
		</Section>
	);
}
