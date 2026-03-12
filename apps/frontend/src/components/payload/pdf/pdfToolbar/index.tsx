'useclient';
/* * */

import { Button } from '@mantine/core';
import { useTranslations } from 'next-intl';

import styles from './styles.module.css';

/* * */

interface pdfToolbarProps {
	numPages: number
	onDownload: () => void
	onNextPage: () => void
	onPrevPage: () => void
	pageNumber: number
}

/* * */

export function PdfToolbar({ numPages, onDownload, onNextPage, onPrevPage, pageNumber }: pdfToolbarProps) {
	//

	//
	// A. Setup variables

	const t = useTranslations('payload.pdf.toolbar');

	//
	// B. Render components

	return (
		<div className={styles.controls}>
			<Button className={styles.button} disabled={pageNumber <= 1} onClick={onPrevPage} variant="default"> {t('previous')} </Button>
			<span className={styles.pageCount}>{pageNumber} / {numPages}</span>
			<Button className={styles.button} disabled={pageNumber >= numPages} onClick={onNextPage} variant="default"> {t('next')} </Button>
			<Button className={styles.downloadButton} onClick={onDownload} variant="default">Descarregar</Button>
		</div>
	);

	//
}
