/* * */

import Button from '@/components/common/Button';
import { Review2025CardSchema } from '@/components/review-2025/_data/cards';
import { IconCaretLeftFilled, IconShare } from '@tabler/icons-react';

import styles from './styles.module.css';

import { Review2025Group } from '../Review2025Group';

/* * */

interface Props {
	cardData: Review2025CardSchema
}

export default function Review2025Card({ cardData }: Props) {
	//

	//
	// A. Render components

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<p className={styles.headerTitle}>{cardData.header}</p>
				<IconCaretLeftFilled className={styles.headerIconClosed} data-open={false} />
			</div>

			<div className={styles.badgesWrapper}>
				{cardData.badges.map(badge => (
					<img
						key={badge}
						alt={badge}
						className={styles.badge}
						data-active={cardData.active_badges.includes(badge)}
						src={`/assets/review-2025/images/${badge}.svg`}
					/>
				))}
			</div>

			<div className={styles.content}>
				<p className={styles.contentDescription}>{cardData.content.description}</p>
				{cardData.content.content_group.map((group, index) => (
					<Review2025Group key={index} data={group} />
				))}

			</div>
			<div className={styles.footer}>
				<Button className={styles.button} icon={<IconShare />} label="Partilhar" />
			</div>
		</div>
	);

	//
}
