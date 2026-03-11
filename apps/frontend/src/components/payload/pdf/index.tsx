'use client';
/* * */

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

import { PdfToolbar } from './pdfToolbar';

/* * */

interface PdfProps {
	url?: string
}

/* * */

function getProxiedUrl(url: string): string {
	const filename = url.split('/').pop();
	if (!filename) return url;
	return `/api/media/file/${encodeURIComponent(filename)}`;
}

/* * */

export function Pdf({ url }: PdfProps) {
	//

	//
	// A. Setup variables

	const [mounted, setMounted] = useState(false);
	const [numPages, setNumPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [error, setError] = useState<null | string>(null);
	const [ReactPdf, setReactPdf] = useState<null | typeof import('react-pdf')>(null);
	const proxiedUrl = getProxiedUrl(url);

	const t = useTranslations('payload.pdf');

	//
	// B. Transform Data

	useEffect(() => {
		setMounted(true);
		import('react-pdf').then((module) => {
			module.pdfjs.GlobalWorkerOptions.workerSrc = new URL(
				'pdfjs-dist/build/pdf.worker.min.mjs',
				import.meta.url,
			).toString();
			setReactPdf(module);
		});
	}, []);

	//
	// C. Handle Actions

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
	// D. Render components

	if (!mounted || !ReactPdf) {
		return <div className={styles.loading}>{t('loading')}</div>;
	}

	if (error) {
		return <div className={styles.error}>{t('error')}</div>;
	}

	const { Document, Page } = ReactPdf;

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

			<PdfToolbar numPages={numPages} onDownload={handleDownload} onNextPage={handleGoToNextPage} onPrevPage={handleGoToPrevPage} pageNumber={currentPage} />

		</div>
	);

	//
}
