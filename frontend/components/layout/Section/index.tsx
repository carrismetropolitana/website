/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	heading?: string
	subheading?: string
	withBottomDivider?: boolean
	withGap?: boolean
	withPadding?: boolean
}

/* * */

export function Section({ children, heading, subheading, withBottomDivider, withGap, withPadding }: Props) {
	return (
		<section className={`${styles.container} ${withBottomDivider && styles.withBottomDivider} ${withGap && styles.withGap} ${withPadding && styles.withPadding}`}>

			{(heading || subheading) && (
				<div className={styles.headingWrapper}>
					{heading && <h1 className={styles.heading}>{heading}</h1>}
					{subheading && <h6 className={styles.subheading}>{subheading}</h6>}
				</div>
			)}

			{children && (
				<div className={styles.childrenWrapper}>
					{children}
				</div>
			)}

		</section>
	);
}
