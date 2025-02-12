/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	country?: string
	value: string
}

/* * */

export function LicensePlate({ country = 'pt', value }: Props) {
	//

	//
	// A. Transform data

	const formattedPlate = value.split('-').join('').match(/.{1,2}/g)?.join(' ');

	//
	// B. Render components

	return (
		<div className={styles.container}>
			<span className={styles.country}>
				{country}
			</span>
			<span className={styles.plate}>
				{formattedPlate}
			</span>
		</div>
	);

	//
}
