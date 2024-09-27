/* * */

import { BrandsOperators, IconsConnections, IconsFacilities } from '@/settings/assets.settings';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	category: 'connections' | 'facilities' | 'operators'
	name: string
}

/* * */

export function IconDisplay({ category, name }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('IconDisplay');

	//
	// B. Transform data

	let iconSrc: string;

	switch (category) {
		case 'connections':
			iconSrc = IconsConnections[name as keyof typeof IconsConnections];
			break;
		case 'facilities':
			iconSrc = IconsFacilities[name as keyof typeof IconsFacilities];
			break;
		case 'operators':
			iconSrc = BrandsOperators[name as keyof typeof BrandsOperators];
			break;
	}

	//
	// C. Render components

	if (!iconSrc) {
		return null;
	}

	return (
		<div className={styles.container}>
			<Image alt={t(`${category}.${name}`)} height={24} src={iconSrc} width={24} />
		</div>
	);

	//
}
