/* * */

import styles from './styles.module.css';

/* * */

interface SectionProps {
	children?: React.ReactNode
	heading?: string
	subheading?: string
	withChildrenPadding?: boolean
	withGap?: boolean
	withTopBorder?: boolean
	withTopPadding?: boolean
}

/* * */

export default function Component({ children, heading = '', subheading = '', withChildrenPadding = false, withGap = true, withTopBorder = true, withTopPadding = false }: SectionProps) {
	return (
		<div className={`${styles.container} ${withTopBorder && styles.withTopBorder} ${withChildrenPadding && styles.withChildrenPadding} ${withTopPadding && styles.withTopPadding} ${withGap && styles.withGap} ${!heading && !subheading && !withTopPadding && styles.withoutHeadingOrSubheading}`}>
			{heading && (
				<div className={`${styles.headingWrapper}`}>
					<h2 className={styles.heading}>{heading}</h2>
					{subheading && <h6 className={styles.subheading}>{subheading}</h6>}
				</div>
			)}
			<div className={`${styles.childrenWrapper}`}>
				{children}
			</div>
		</div>
	);
}
