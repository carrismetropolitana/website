'useclient';
/* * */

import { Button } from '@mantine/core';
import { IconDownload } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface ToolbarProps {
	numPages: number
	onDownload: () => void
	onNextPage: () => void
	onPrevPage: () => void
	pageNumber: number
}

/* * */

export function Toolbar({ numPages, onDownload, onNextPage, onPrevPage, pageNumber }: ToolbarProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('payload.pdf.toolbar');

	//
	// B. Render components

	return (
		<div className={styles.toolbar}>
			<Button className={styles.button} disabled={pageNumber <= 1} onClick={onPrevPage} variant="default"> {t('previous')} </Button>
			<span className={styles.pageCount}>{pageNumber} / {numPages}</span>
			<Button className={styles.button} disabled={pageNumber >= numPages} onClick={onNextPage} variant="default"> {t('next')} </Button>
			<div className={styles.downloadButton} onClick={onDownload}><IconDownload size={16} /></div>
		</div>
	);

	//
}
