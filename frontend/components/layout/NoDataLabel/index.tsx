/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface NoDataLabelProps {
	fill?: boolean
	text?: string
	withMinHeight?: boolean
}

/* * */

export default function Component({ fill, text, withMinHeight }: NoDataLabelProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('layout.NoDataLabel');

	//
	// B. Render components

	return <div className={`${styles.container} ${fill && styles.fill} ${withMinHeight && styles.withMinHeight}`}>{text || t('default')}</div>;

	//
}
