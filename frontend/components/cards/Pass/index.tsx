/* * */

import Section from '@/components/layout/Section';
import { IconsCommon, ImagesCommon } from '@/utils/assets';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Section heading="Passe Mensal" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withChildrenPadding>
			<div className={styles.content}>
				<div className={styles.card}>
					<div className={styles.images}>
						<img alt="Passe Mensal" src={IconsCommon.COINS} />
						<img alt="Passe Mensal" src={IconsCommon.RECEIPT} />
					</div>
					<h2>Descruba a melhor opção para si.</h2>
					<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo ratione architecto, veniam mollitia temporibus fugit expedita odit? Accusantium, velit corporis voluptatem debitis necessitatibus voluptate officia, sequi atque distinctio sed a.</p>
				</div>
				<div className={styles.card}>
					<div className={styles.images}>
						<img alt="Passe Mensal" src={ImagesCommon.NAVEGANTE_CARD} />
					</div>
					<h2>Já tem um cartão personalizado?</h2>
					<p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae, fugit delectus atque ex, necessitatibus ullam suscipit odit cupiditate quis accusantium corrupti numquam, voluptatibus soluta? Sit dignissimos blanditiis autem tenetur minus.</p>
				</div>
			</div>
		</Section>
	);
}
