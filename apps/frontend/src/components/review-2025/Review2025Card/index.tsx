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
				<p className={styles.headerTitle}>{cardData.title}</p>
				<IconCaretLeftFilled className={styles.headerIconClosed} data-open={false} />
			</div>

			<div className={styles.badgesWrapper}>
				{Object.keys(cardData.badges).map((badge) => {
					if (cardData.badges[badge as keyof typeof cardData.badges] === 'hidden') return null;
					return (
						<img
							key={badge}
							alt={badge}
							className={styles.badge}
							data-active={cardData.badges[badge as keyof typeof cardData.badges] === 'active'}
							src={`/assets/review-2025/images/${badge}.svg`}
						/>
					);
				})}
			</div>

			<div className={styles.content}>
				<p className={styles.contentDescription}>{cardData.description}</p>
				{cardData.content.map((group, index) => (
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
