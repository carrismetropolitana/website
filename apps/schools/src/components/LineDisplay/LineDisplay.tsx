'use client';

import useSWR from 'swr';

import styles from './LineDisplay.module.css';

export function LineBadge({ color, short_name, text_color }) {
	return (
		<div className={styles.badge} style={{ backgroundColor: color, color: text_color }}>
			{short_name || '• • •'}
		</div>
	);
}

export function LineName({ name }) {
	return <div className={styles.name}>{name}</div>;
}

export default function LineDisplay({ route_id }) {
	//

	//
	// A. Fetch data

	const { data: routeData } = useSWR(`https://api.carrismetropolitana.pt/routes/${route_id}`);

	//
	// B. Handle actions

	const handleClick = () => {
		const websiteURL = `https://carrismetropolitana.pt/lines/${routeData.short_name}`;
		window.open(websiteURL, '_blank', 'noopener,noreferrer');
	};

	//
	// C. Render components

	return (
		routeData
		&& (
			<div className={styles.container} onClick={handleClick}>
				<LineBadge color={routeData.color} short_name={routeData.short_name} text_color={routeData.text_color} />
				<LineName name={routeData.long_name} />
			</div>
		)

	);

	//
}
