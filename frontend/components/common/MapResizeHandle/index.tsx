/* * */

import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import { useRef } from 'react';

import styles from './styles.module.css';

/* * */

export default function Component() {
	//

	//
	// A. Setup variables

	const mapOptionsContext = useMapOptionsContext();

	const initialViewportHeightRef = useRef(mapOptionsContext.data.viewport_height);
	const initialMouseYRef = useRef(null);

	//
	// B. Handle actions

	const handleMouseDown = (e) => {
		console.log('handleMouseDown', e.clientY);
		initialMouseYRef.current = e.clientY;
		initialViewportHeightRef.current = mapOptionsContext.data.viewport_height;
		document.addEventListener('mousemove', handleMouseMove);
		document.addEventListener('mouseup', handleMouseUp);
	};

	const handleMouseMove = (e) => {
		const deltaY = e.clientY - (initialMouseYRef.current || e.clientY);
		const newHeight = initialViewportHeightRef.current + deltaY;
		mapOptionsContext.actions.setViewportHeight(newHeight);
	};

	const handleMouseUp = () => {
		document.removeEventListener('mousemove', handleMouseMove);
		document.removeEventListener('mouseup', handleMouseUp);
	};

	//
	// C. Render components

	return (
		<div className={styles.container}>
			<div className={styles.handle} onMouseDown={handleMouseDown} />
		</div>
	);
}
