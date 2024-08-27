'use client';
/* * */

import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* * */

export default function Component() {
	const [darkThemeMq, setDarkThemeMq] = useState(false);

	useEffect(() => {
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		mediaQuery.addEventListener('change', (e) => {
			setDarkThemeMq(e.matches);
		});
	}, []);

	return (
		<ToastContainer
			autoClose={3000}
			theme={darkThemeMq ? 'dark' : 'light'}
		/>
	);
}
