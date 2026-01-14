/* * */

import Button from '@/components/common/Button';
import { IconCaretLeftFilled, IconShare } from '@tabler/icons-react';

import styles from './styles.module.css';

import { Review2025Card } from '../_data/cards';
import { Review2025ContentGroup } from '../Review2025ContentGroup';

/* * */

export default function Review2025Card({ data }: { data: Review2025Card }) {
	//

	//
	// A. Render components

	return (
		<div className={styles.container} style={{ borderColor: data.color }}>
			<div className={styles.header}>
				<p className={styles.headerTitle}>{data.title}</p>
				<IconCaretLeftFilled className={styles.headerIconClosed} data-open={false} />
			</div>

			<div className={styles.badgesWrapper}>
				{Object.keys(data.badges).map((badge) => {
					if (data.badges[badge as keyof typeof data.badges] === 'hidden') return null;
					return (
						<img
							key={badge}
							alt={badge}
							className={styles.badge}
							data-active={data.badges[badge as keyof typeof data.badges] === 'active'}
							src={`/assets/review-2025/images/${badge}.svg`}
						/>
					);
				})}
			</div>

			<div className={styles.content}>
				<p className={styles.contentDescription}>{data.description}</p>
				{data.content.map((group, index) => (
					<Review2025ContentGroup key={index} data={group} />
				))}

			</div>
			<div className={styles.footer}>
				<Button className={styles.button} icon={<IconShare />} label="Partilhar" />
			</div>
		</div>
	);

	//
}
