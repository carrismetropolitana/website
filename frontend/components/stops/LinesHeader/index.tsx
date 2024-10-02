import LineBadge from '@/components/lines/LineBadge';
import { useStopsSingleContext } from '@/contexts/StopsSingle.context';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

export default function LinesHeader() {
	const stopsSingleContext = useStopsSingleContext();
	const t = useTranslations('stops.Single');
	const availableLines = stopsSingleContext.data.valid_lines;
	return (
		<div className={styles.container}>
			<div className={styles.lineContainer}>
				{availableLines && availableLines.map(line => <LineBadge key={line.line_id} line={line} size="lg" />)}
			</div>
		</div>
	);
}
