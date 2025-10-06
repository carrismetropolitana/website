/* * */

import { LineBadge } from '@/components/lines/LineBadge';
import { Image, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	description1?: string
	description2?: string
	description3?: string
	filter_value: string
	footer?: string
	image?: string
	line_color?: string
	municipality_name?: string
	subheading?: string
	title: string
	value: number
}

/* * */

export function MetricsComplaintsPageCardGroupCard({ description1, description2, description3, filter_value, footer, image, line_color, municipality_name, subheading, title, value }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('metrics.MetricsPageComplaintsCardGroup');

	//
	// B. Render components

	return (
		<div>
			<div className={styles.cardMainWrapperShadow} style={{ backgroundColor: line_color }}>
				<Text className={styles.headerTitle} style={{ color: line_color ? '#FFFFFF' : '' }}>{title}</Text>
			</div>
			<div className={styles.cardMainWrapper}>
				<div className={styles.cardBody}>
					<Text className={styles.totalToText}>{t('total_to')}</Text>
					{subheading === 'line' && <div className={styles.lineBadge}><LineBadge color={line_color} lineId={filter_value} /></div> }
					{subheading === 'global' && <Text className={styles.subheading}>área metropolitana de Lisboa</Text> }
					{subheading === 'municipality' && <Text className={styles.subheading}>{municipality_name}</Text> }

					<Image alt={title}className={styles.image} src={image} />
					<Text className={styles.bodyValue1}>{t('main_value', { value: value })}</Text>
					<Text className={styles.bodyDescription1}>{description1}</Text>

					<div className={styles.cardBodyInnerCard} style={{ backgroundColor: line_color || '' }}>
						{ description3 &&	(
							<>
								<Text className={styles.bodyDescription2} style={{ color: line_color ? '#FFFFFF' : '' }}>{description2}</Text>
								<Text className={styles.bodyDescription3} style={{ color: line_color ? '#FFFFFF' : '' }}>{description3}</Text>
							</>
						)}
					</div>

				</div>
				<div className={styles.cardFooter}>
					<Text className={styles.footerNotes}>{footer}</Text>
				</div>

			</div>
		</div>
	);

	//
}
