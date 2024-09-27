'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/common/Card';
import { ThemeDark, ThemeLight } from '@/components/common/Theme';
import Section from '@/components/layout/Section';
import { IconsCommon } from '@/settings/assets.settings';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

export default function Component() {
	return (
		<Section heading="Atendimento preferencial" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withChildrenPadding>
			<div className={styles.content}>
				<Card className={styles.card}>
					<CardHeader>
						<div className={styles.images}>
							<Image alt="Navegante Ocasional" src={IconsCommon.NAVEGANTE_POINT} />
						</div>
					</CardHeader>
					<CardContent>
						<CardTitle>Espaços navegante®</CardTitle>
						<CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati ea natus itaque qui iure nam consequuntur minima, quibusdam saepe odio molestiae soluta aspernatur, corrupti labore fugiat? Numquam blanditiis accusantium quibusdam!</CardDescription>
					</CardContent>
				</Card>
				<Card className={styles.card}>
					<CardHeader>
						<div className={styles.images}>
							<Image alt="Passe Navegante" src={IconsCommon.NAVEGANTE_APP} />
						</div>
					</CardHeader>
					<CardContent>
						<CardTitle>App navegante®</CardTitle>
						<CardDescription>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda magnam incidunt nam pariatur, molestias sequi beatae modi odio cumque a nesciunt facilis ad. Provident, ullam. Quae vero quis dolor animi.</CardDescription>
					</CardContent>
				</Card>
				<Card className={styles.cardAlt}>
					<CardHeader>
						<div className={styles.images}>
							<ThemeLight>
								<Image alt="Navegante Ocasional" src={IconsCommon.MULTIBANCO_DARK} />
							</ThemeLight>
							<ThemeDark>
								<Image alt="Navegante Ocasional" src={IconsCommon.MULTIBANCO_LIGHT} />
							</ThemeDark>
						</div>
					</CardHeader>
					<CardContent>
						<CardTitle>Rede multibanco™</CardTitle>
						<CardDescription>Pode carregar o seu cartão navegante® em qualquer multibanco.</CardDescription>
					</CardContent>
				</Card>
				<Card className={styles.cardAlt}>
					<CardHeader>
						<div className={styles.images}>
							<Image alt="Passe Navegante" src={IconsCommon.PAYSHOP} />
						</div>
					</CardHeader>
					<CardContent>
						<CardTitle>Rede de Agentes payshop™</CardTitle>
						<CardDescription>Pode carregar o seu cartão navegante® em qualquer multibanco.</CardDescription>
					</CardContent>
				</Card>
			</div>
		</Section>
	);
}
