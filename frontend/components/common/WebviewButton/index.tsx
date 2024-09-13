/* * */

import { useMapOptionsContext } from '@/contexts/MapOptions.context';
import { useRef } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	label: string
	onClick: () => void
}

/* * */

export default function Component({ label, onClick }: Props) {
	//

	//
	// B. Handle actions

	const handleClick = (e) => {
		onClick();
	};

	const handleMouseMove = (e) => {
		if (initialMouseYRef.current === null || initialViewportHeightRef.current === null) return;
		const deltaY = e.clientY - initialMouseYRef.current;
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
