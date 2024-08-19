'use client';
import Section from '@/components/layout/Section';

import styles from './styles.module.css';

export default function Component() {
	return (

		<Section
			withTopBorder={false}
			withTopPadding={false}
			withChildrenNudge
			withChildrenPadding
		>
			<iframe
				className={styles.iframe}
				src="https://www.carrismetropolitana.pt/formulario-embed/"
				title="Formulário de contacto"
			/>
		</Section>

	);
}
