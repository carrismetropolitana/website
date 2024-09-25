/* * */

import Section from '@/components/layout/Section';
import { IconsCommon } from '@/utils/assets';
import { Image } from '@mantine/core';

import styles from './styles.module.css';

/* * */

export default function Component() {
	return (
		<Section heading="Modalidades" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withChildrenPadding>
			<div className={styles.content}>
				<div className={styles.card}>
					<div className={styles.images}>
						<Image alt="AML Map" src={IconsCommon.AML_MAP} />
					</div>
					<div className={styles.cardContent}>
						<h3><span>40€</span>/mês</h3>
						<h2>Viaje por todo o lado, sem limites.</h2>
						<p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius, ut.</p>
					</div>
				</div>
				<div className={styles.card}>
					<div className={styles.images}>
						<Image alt="AML Map Single" src={IconsCommon.AML_MAP_SINGLE} />
					</div>
					<div className={styles.cardContent}>
						<h3><span>30€</span>/mês</h3>
						<h2>Viaje num município.</h2>
						<p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut libero porro quo, ducimus ad deleniti debitis labore nemo ipsa est.</p>
					</div>
				</div>
			</div>
		</Section>
	);
}
