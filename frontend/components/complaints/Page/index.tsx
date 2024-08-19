/* * */

import Section from '@/components/layout/Section';
import { useTranslations } from 'next-intl';

import Form from '../Form';

/* * */

export default function Component() {
	const t = useTranslations('complaints');
	return (
		<>
			<Section heading={t('heading')} withTopBorder={false} />
			<Form />
		</>
	);
}
