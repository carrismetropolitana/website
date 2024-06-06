/* * */

import styles from './styles.module.css';

/* * */

export default function Component({ children, heading, withGlobalPadding = false, withTopBorder = true }) {
	return (
		<div className={`${styles.container} ${withTopBorder && styles.withTopBorder} ${withGlobalPadding && styles.withGlobalPadding}`}>
			{heading && (
				<div className={`${styles.headingWrapper}`}>
					<h2 className={styles.heading}>{heading}</h2>
				</div>
			)}
			<div className={`${styles.childrenWrapper}`}>
				{children}
			</div>
		</div>
	);
}
