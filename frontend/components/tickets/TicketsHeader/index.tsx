/* * */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { IconsCommon, ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Surface>
			<Section heading="Bilhetes Ocasionais" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withPadding>
				<Grid columns="ab" withGap>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Icon Coins" src={IconsCommon.COINS} />
								<Image alt="Icon Receipt" src={IconsCommon.RECEIPT} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>Comprar dentro do autocarro</CardTitle>
							<CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ea natus itaque qui iure nam consequuntur minima, quibusdam saepe odio molestiae soluta aspernatur, corrupti labore fugiat? Numquam blanditiis accusantium quibusdam!</CardDescription>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Bilhete Navegante Ocasional" src={ImagesCommon.NAVEGANTE_OCCASIONAL} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>Comprar antes da viagem</CardTitle>
							<CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda magnam incidunt nam pariatur, molestias sequi beatae modi odio cumque a nesciunt facilis ad. Provident, ullam. Quae vero quis dolor animi.</CardDescription>
						</CardContent>
					</Card>
				</Grid>
			</Section>
		</Surface>
	);
}
