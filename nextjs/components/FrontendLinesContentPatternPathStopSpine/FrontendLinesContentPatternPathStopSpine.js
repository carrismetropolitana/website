/* * */

import styles from './FrontendLinesContentPatternPathStopSpine.module.css';

/* * */

export default function FrontendLinesContentPatternPathStopSpine({ style = 'regular', color, textColor, isSelected }) {
	//

	//
	// A. Render components

	if (style === 'start') {
		return (
			<div className={`${styles.container} ${styles.start} ${isSelected && styles.isSelected}`} style={{ backgroundColor: color }}>
				<div className={styles.spineIcon}>
					<div className={styles.spineIconOuter}>
						<div className={styles.spineIconInner} style={{ borderColor: textColor }} />
					</div>
				</div>
			</div>
		);
	}

	if (style === 'end') {
		return (
			<div className={`${styles.container} ${styles.end} ${isSelected && styles.isSelected}`} style={{ backgroundColor: color }}>
				<div className={styles.spineIcon}>
					<div className={styles.spineIconOuter}>
						<div className={styles.spineIconInner} style={{ borderColor: textColor }} />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className={`${styles.container} ${isSelected && styles.isSelected}`} style={{ backgroundColor: color }}>
			<div className={styles.spineIcon}>
				<div className={styles.spineIconOuter}>
					<div className={styles.spineIconInner} style={{ borderColor: textColor }} />
				</div>
			</div>
		</div>
	);

	//
}