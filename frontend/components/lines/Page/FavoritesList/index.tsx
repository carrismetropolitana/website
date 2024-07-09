import { useProfileContext } from '@/contexts/ProfileContext';
import { Line } from '@/utils/types.js';
import { useTranslations } from 'next-intl';

import LineItem from '../LineItem';
import styles from '../styles.module.css';

export default function Component({ data }: { data: Line[] }) {
	const t = useTranslations('lines');

	const { profile } = useProfileContext();
	const favoriteLines = data.filter(line => profile.favoriteLines.includes(line.id));
	return (
		<>
			{ favoriteLines.length > 0
				? favoriteLines.map((line, key) => <LineItem key={key} line={line} />,
				) : <div className={styles.empty}>{t('no_favorites')}</div>}
		</>
	);
}
