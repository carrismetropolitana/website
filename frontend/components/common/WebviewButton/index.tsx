/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	label: string
	onClick: () => void
}

/* * */

export default function Component({ label, onClick }: Props) {
	//

	//
	// A. Handle actions

	const handleClick = (e) => {
		onClick();
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.handle} />
		</div>
	);
}
