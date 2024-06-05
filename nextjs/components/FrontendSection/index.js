/* * */

import FrontendText from '@/components/FrontendText';

import styles from './styles.module.css';

/* * */

export default function Component({ children, heading = 'Section Heading' }) {
	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.headingWrapper}`}>
				<FrontendText size="heading" text={heading} />
			</div>
			<div className={`${styles.childrenWrapper}`}>
				{children}
			</div>
		</div>
	);
}
