import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { Grid } from '@/components/layout/Grid';
import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';
import { ImagesCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

export default function Component() {
	return (
		<Surface>
			<Section heading="Onde comprar?" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withPadding>
				<Grid columns="ab" withGap>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Navegante Ocasional" src={ImagesCommon.NAVEGANTE_OCCASIONAL} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>Viagens ocasionais</CardTitle>
							<CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ea natus itaque qui iure nam consequuntur minima, quibusdam saepe odio molestiae soluta aspernatur, corrupti labore fugiat? Numquam blanditiis accusantium quibusdam!</CardDescription>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<div className={styles.images}>
								<Image alt="Passe Navegante" src={ImagesCommon.NAVEGANTE_CARD} />
							</div>
						</CardHeader>
						<CardContent>
							<CardTitle>Viagens Frequentes</CardTitle>
							<CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda magnam incidunt nam pariatur, molestias sequi beatae modi odio cumque a nesciunt facilis ad. Provident, ullam. Quae vero quis dolor animi.</CardDescription>
						</CardContent>
					</Card>
				</Grid>
			</Section>
		</Surface>
	);
}
