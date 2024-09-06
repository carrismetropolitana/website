/* * */

import type { Exception } from '@/types/timetables.types';

import { Link } from '@/translations/navigation';
import { IconArrowUpRight } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface Props {
	exceptionData: Exception
	selectedExceptionIds: string[]
	setSelectedExceptionIds: (values: string[]) => void
}

/* * */

export default function Component({ exceptionData, selectedExceptionIds, setSelectedExceptionIds }: Props) {
	//

	//
	// A. Setup variables

	const t = useTranslations('common.TimetableExceptionsLink');

	//
	// B. Transform data

	const isSelected = selectedExceptionIds.includes(exceptionData.exception_id);

	//
	// C. Handle actions

	const handleMouseOverException = () => {
		setSelectedExceptionIds([exceptionData.exception_id]);
	};

	const handleMouseOutException = () => {
		setSelectedExceptionIds([]);
	};

	//
	// D. Render components

	return (
		<div
			className={`${styles.container} ${isSelected && styles.isSelected} ${!isSelected && selectedExceptionIds.length > 0 && styles.isOthersSelected}`}
			onMouseOut={handleMouseOutException}
			onMouseOver={handleMouseOverException}
		>
			{exceptionData.type === 'variant' && t.rich('variant', {
				//
				exception_id: exceptionData.exception_id,
				exceptionId: chunks => (
					<span className={styles.exceptionId}>{chunks}</span>
				),
				//
				pattern_headsign: exceptionData.pattern_headsign,
				patternHeadsign: chunks => (
					<Link className={styles.patternHeadsign} href="#" target="_blank">
						{chunks}
						<IconArrowUpRight className={styles.icon} />
					</Link>
				),
				//
				route_long_name: exceptionData.route_long_name,
				routeLongName: chunks => (
					<span className={styles.routeLongName}>{chunks}</span>
				),
				//
			})}
		</div>
	);

	//
}
