/* * */

import FrontendText from '@/components/FrontendText';

import styles from './styles.module.css';

/* * */

export default function Component({ children, heading, withGlobalPadding = false, withTopBorder = true }) {
	return (
		<div className={`${styles.container} ${withTopBorder && styles.withTopBorder} ${withGlobalPadding && styles.withGlobalPadding}`}>
			{heading && (
				<div className={`${styles.headingWrapper}`}>
					<FrontendText size="heading" text={heading} />
				</div>
			)}
			<div className={`${styles.childrenWrapper}`}>
				{children}
			</div>
		</div>
	);
}
