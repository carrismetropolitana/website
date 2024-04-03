'use client';

/* * */

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { IconFileDownload } from '@tabler/icons-react';
import styles from './FrontendLinesContentPatternPathStopPdf.module.css';

/* * */

export default function FrontendLinesContentPatternPathStopPdf({ lineId, stopId, direction }) {
	//

	//
	// A. Setup variables

	const t = useTranslations('FrontendLinesContentPatternPathStopPdf');
	const [pdfFileExists, setPdfFileExists] = useState(true);

	const pdfFileUrl = `https://storage.carrismetropolitana.pt/static/pdfs/horarios/horario-singular-${stopId}-${lineId}-${direction}.pdf`;

	//
	// B. Transform data

	useEffect(() => {
		(async function () {
			try {
				const response = await fetch(pdfFileUrl);
				if (response.ok) setPdfFileExists(true);
				else throw new Error('PDF file not found');
			} catch (error) {
				setPdfFileExists(false);
			}
		})();
	}, [pdfFileUrl]);

	//
	// C. Render components

	return pdfFileExists ?
		<a className={`${styles.container} ${styles.pdfFileExists}`} target='_blank' href={pdfFileUrl}>
			<IconFileDownload size={18} />
			<p>{t('pdf_file_exists')}</p>
		</a> :
		<div className={`${styles.container} ${styles.pdfFileDoesNotExist}`}>
			<IconFileDownload size={18} />
			<p>{t('pdf_file_does_not_exist')}</p>
		</div>;

	//
}