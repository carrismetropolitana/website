/* * */

import styles from './styles.module.css';

/* * */

interface Props {
	children?: React.ReactNode
	heading?: string
	subheading?: string
	variant?: 'default' | 'muted' | 'standout' | 'success' | 'warning'
	withBottomDivider?: boolean
	withGap?: boolean
	withPadding?: boolean
}

/* * */

export function Section({ children, heading, subheading, variant = 'default', withBottomDivider, withGap, withPadding }: Props) {
	return (
		<section className={`${styles.container} ${withBottomDivider && styles.withBottomDivider} ${withGap && styles.withGap} ${withPadding && styles.withPadding} ${styles[variant]}`}>

			{(heading || subheading) && (
				<div className={styles.headingWrapper}>
					{heading && <h1 className={`${styles.heading} heading`}>{heading}</h1>}
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
