import { Section } from '@/components/layout/Section';
import { Surface } from '@/components/layout/Surface';

import ServicePointsFilters from '../ServicePointsFilters';
import styles from './styles.module.css';

export default function Component() {
	return (
		<Surface>
			<Section heading="Pontos de Atendimento" subheading="Descubra quanto custa viajar na CMetropolitana de vez em quando. Para utilizações mais frequentes sugerimos a adesão ao sistema navegante®." withPadding>
				<ServicePointsFilters />
				<div className={styles.servicePoints}>
					<div className={styles.map}>MAP GOES HERE</div>
					<div className={styles.brands}>Brands go here</div>
				</div>
			</Section>
		</Surface>
	);
}
