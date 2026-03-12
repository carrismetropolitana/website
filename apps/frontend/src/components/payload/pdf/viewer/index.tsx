'use client';
/* * */

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Toolbar } from '@/components/payload/pdf/toolbar';
import { getProxiedUrl } from '@/utils/getProxiedUrl';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import styles from './styles.module.css';

/* * */

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
	'pdfjs-dist/build/pdf.worker.min.mjs',
	import.meta.url,
).toString();

/* * */

export function Viewer({ url }: { url: string }) {
	//

	//
	// A. Setup variables

	const [numPages, setNumPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [error, setError] = useState<null | string>(null);
	const proxiedUrl = getProxiedUrl(url);

	const t = useTranslations('payload.pdf');

	//
	// B. Handle Actions

	function handleDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
		setCurrentPage(1);
		setError(null);
	}

	function handleDocumentLoadError(err: Error) {
		setError(err.message);
	}

	function handleGoToPrevPage() {
		setCurrentPage(prev => Math.max(prev - 1, 1));
	}

	function handleGoToNextPage() {
		setCurrentPage(prev => Math.min(prev + 1, numPages));
	}

	function handleDownload() {
		const link = document.createElement('a');
		link.href = proxiedUrl;
		link.download = url.split('/').pop() || 'carrismetropolitana.pt.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	//
	// C. Render components

	if (error) {
		return <div className={styles.error}>{t('error')}</div>;
	}

	return (
		<div className={styles.container}>
			<Document
				file={proxiedUrl}
				loading={<div className={styles.loading}>{t('loading')}</div>}
				onLoadError={handleDocumentLoadError}
				onLoadSuccess={handleDocumentLoadSuccess}
			>
				<Page
					className={styles.page}
					pageNumber={currentPage}
					renderTextLayer={true}
					width={undefined}
				/>
			</Document>

			<Toolbar numPages={numPages} onDownload={handleDownload} onNextPage={handleGoToNextPage} onPrevPage={handleGoToPrevPage} pageNumber={currentPage} />

		</div>
	);

	//
}
