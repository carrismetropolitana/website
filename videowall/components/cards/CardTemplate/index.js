/* * */

import Loader from '@/components/common/Loader';
import LabelDateFromTo from '@/components/text/LabelDateFromTo';
import LabelDateRelative from '@/components/text/LabelDateRelative';

import styles from './styles.module.css';

/* * */

export default function CardTemplate({ children, endDate = '', isLoading = false, isValidating = false, startDate = '', timestamp = '', title = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div className={styles.title}>{title}</div>
				<div>{isLoading || isValidating ? <Loader size={18} visible /> : <LabelDateRelative date={timestamp} />}</div>
			</div>
			{children}
			<LabelDateFromTo endDate={endDate} startDate={startDate} />
		</div>
	);
}
