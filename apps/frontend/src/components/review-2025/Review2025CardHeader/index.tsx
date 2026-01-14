/* * */

import { IconCaretLeftFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

import { Review2025Card } from '../_data/cards';

/* * */

interface Props {
	cardData: Review2025Card
	isOpen: boolean
	onToggle: () => void
}

export function Review2025CardHeader({ cardData, isOpen, onToggle }: Props) {
	//
	return (
		<>
			<div className={styles.header} onClick={onToggle} style={{ cursor: 'pointer' }}>
				<p className={styles.headerTitle}>{cardData.title}</p>
				<IconCaretLeftFilled className={styles.headerIconClosed} data-open={isOpen} />
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
		</>
	);
	//
}
