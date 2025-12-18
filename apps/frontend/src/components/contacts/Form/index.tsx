'use client';

/* * */

import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const [height, setHeight] = useState(900);
	const lastContentHeight = useRef<number>(900);

	//
	// B. Handle actions

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			// Security check: only accept messages from the official backoffice origin.
			if (event.origin !== 'https://backoffice.carrismetropolitana.pt') return;

			if (!event.data || typeof event.data.height !== 'number') return;

			// Extract and validate the data payload.
			const contentHeight = event.data.height;

			console.log(
				'[Contacts Form] Mensagem recebida:',
				'origin=',
				event.origin,
				'height=',
				contentHeight,
			);

			// Discard clearly invalid height values.
			if (contentHeight <= 0 || contentHeight > 5000) return;

			// Do not update If the new height is almost the same as the previous one,
			if (Math.abs(contentHeight - lastContentHeight.current) < 5) {
				return;
			}

			// Store the new height and update the iframe height state.
			lastContentHeight.current = contentHeight;
			setHeight(contentHeight);
		};

		window.addEventListener('message', handleMessage);
		return () => window.removeEventListener('message', handleMessage);
	}, []);

	//
	// C. Render components

	return (
		<iframe
			className={styles.iframe}
			src="https://backoffice.carrismetropolitana.pt/formulario-embed-2/"
			style={{ height: `${height}px` }}
			title="Formulário de contacto"
		/>
	);

	//
}
