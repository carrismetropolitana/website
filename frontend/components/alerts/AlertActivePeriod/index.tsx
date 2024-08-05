/* * */

import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface AlertActivePeriodStartProps {
	date?: Date
	size?: 'md' | 'sm'
}

/* * */

export function AlertActivePeriodStart({ date, size = 'md' }: AlertActivePeriodStartProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertActivePeriod');

	//
	// B. Render components

	if (date) {
		return <p className={`${styles.text} ${styles[size]}`}>{t.rich('start', { parsedDate: chunks => <strong>{chunks}</strong>, start: date })}</p>;
	}

	//
}

/* * */

interface AlertActivePeriodEndProps {
	date?: Date
	size?: 'md' | 'sm'
}

/* * */

export function AlertActivePeriodEnd({ date, size = 'md' }: AlertActivePeriodEndProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('alerts.AlertActivePeriod');

	//
	// B. Render components

	if (date) {
		return <p className={`${styles.text} ${styles[size]}`}>{t.rich('end', { end: date, parsedDate: chunks => <strong>{chunks}</strong> })}</p>;
	}

	//
}
