'use client';
/* * */

import { Space } from '@mantine/core';
import { IconCaretLeftFilled } from '@tabler/icons-react';

import styles from './styles.module.css';

import { Review2025BadgeToIcon, Review2025Card } from '../_data/cards';
import * as Icons from '../_data/icons';

/* * */

interface Props {
	cardData: Review2025Card
	isOpen: boolean
	onToggle: () => void
}

export function Review2025CardHeader({ cardData, isOpen, onToggle }: Props) {
	//
	return (
		<div className={styles.container}>
			<div className={styles.header} onClick={onToggle} style={{ cursor: 'pointer' }}>
				<p className={styles.headerTitle}>{cardData.title}</p>
				<IconCaretLeftFilled className={styles.headerIconClosed} data-open={isOpen} />
			</div>

			<div className={styles.badgesWrapper}>
				{Object.keys(cardData.badges).map((badge) => {
					const badgeState = cardData.badges[badge as keyof typeof cardData.badges];
					if (badgeState === 'hidden') return null;

					const IconComponent = Icons[Review2025BadgeToIcon[badge]];
					if (!IconComponent) return null;

					return (
						<IconComponent
							key={badge}
							backgroundColor={badgeState === 'active' ? cardData.color : undefined}
							className={styles.badge}
							color={badgeState === 'active' ? '#fff' : undefined}

						/>
					);
				})}
			</div>
		</div>
	);
	//
}
