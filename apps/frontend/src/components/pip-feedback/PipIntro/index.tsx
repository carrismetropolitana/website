/* * */

import { Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

/* * */

export default function PipIntro() {
	//

	//
	// A. Setup variables

	const t = useTranslations('PipIntro');

	//
	// B. Render components

	return (
		<div>
			<Text>{t('intro')}</Text>
		</div>
	);

	//
}
