'use client';
/* * */

import { Button } from '@mantine/core';

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import styles from './styles.module.css';

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

	const [mounted, setMounted] = useState(false);
	const [numPages, setNumPages] = useState<number>(0);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [error, setError] = useState<null | string>(null);
	const [ReactPdf, setReactPdf] = useState<null | typeof import('react-pdf')>(null);
	const t = useTranslations('payload.pdf.PdfViewer');
	//

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

	if (!url) return null;

	const proxiedUrl = getProxiedUrl(url);

	//

	function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
		setCurrentPage(1);
		setError(null);
	}

	function onDocumentLoadError(err: Error) {
		setError(err.message);
	}

	function goToPrevPage() {
		setCurrentPage(prev => Math.max(prev - 1, 1));
	}

	function goToNextPage() {
		setCurrentPage(prev => Math.min(prev + 1, numPages));
	}

	function handleDownload() {
		const link = document.createElement('a');
		link.href = proxiedUrl;
		link.download = url.split('/').pop() || 'document.pdf';
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}

	//

	if (!mounted || !ReactPdf) {
		return <div className={styles.loading}>Loading PDF...</div>;
	}

	if (error) {
		return <div className={styles.error}>Failed to load PDF</div>;
	}

	//

	const { Document, Page } = ReactPdf;

	return (
		<div className={styles.container}>
			<Document
				file={proxiedUrl}
				loading={<div className={styles.loading}>Loading PDF...</div>}
				onLoadError={onDocumentLoadError}
				onLoadSuccess={onDocumentLoadSuccess}
			>
				<Page
					className={styles.page}
					pageNumber={currentPage}
					renderTextLayer={true}
					width={undefined}
				/>
			</Document>

		
		</div>
	);

	//
}
