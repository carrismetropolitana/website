'use client';
/* * */

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { Toolbar } from '@/components/payload/pdf/toolbar';
import { getProxiedUrl } from '@/utils/getProxiedUrl';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
	const [pageWidth, setPageWidth] = useState<number | undefined>(undefined);
	const containerRef = useRef<HTMLDivElement>(null);
	const resizeRafRef = useRef<null | number>(null);
	const resizeTimeoutRef = useRef<null | ReturnType<typeof setTimeout>>(null);
	const proxiedUrl = useMemo(() => getProxiedUrl(url), [url]);

	const t = useTranslations('payload.pdf');

	const measureContainer = useCallback(() => {
		const el = containerRef.current;
		if (!el) return;

		if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
		resizeRafRef.current = requestAnimationFrame(() => {
			const cs = getComputedStyle(el);
			const width = el.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
			const viewportWidth = window.innerWidth || width;
			const safeWidth = Math.min(width, viewportWidth - 24);
			const nextWidth = Math.max(0, Math.floor(safeWidth));
			setPageWidth(prev => (prev === nextWidth ? prev : nextWidth));
		});
	}, []);

	useEffect(() => {
		measureContainer();
		const handleResize = () => {
			if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
			resizeTimeoutRef.current = setTimeout(measureContainer, 120);
		};
		window.addEventListener('resize', handleResize);
		window.addEventListener('orientationchange', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
			window.removeEventListener('orientationchange', handleResize);
			if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
			if (resizeTimeoutRef.current) clearTimeout(resizeTimeoutRef.current);
		};
	}, [measureContainer]);

	//
	// B. Handle Actions

	function handleDocumentLoadSuccess({ numPages }: { numPages: number }) {
		setNumPages(numPages);
		setCurrentPage(1);
		setError(null);
		measureContainer();
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
		<div ref={containerRef} className={styles.container}>

			<Document
				file={proxiedUrl}
				loading={<div className={styles.loading}>{t('loading')}</div>}
				onLoadError={handleDocumentLoadError}
				onLoadSuccess={handleDocumentLoadSuccess}
			>
				<Page
					className={styles.page}
					loading=""
					pageNumber={currentPage}
					renderTextLayer={true}
					width={pageWidth}
				/>
			</Document>

			<Toolbar numPages={numPages} onDownload={handleDownload} onNextPage={handleGoToNextPage} onPrevPage={handleGoToPrevPage} pageNumber={currentPage} />

		</div>
	);

	//
}
