import { ColorPicker } from '@mantine/core';
import { useState } from 'react';

import styles from './styles.module.css';

export default function DebugColorPicker() {
	const initColor = document.documentElement.style.getPropertyValue('--hsl');
	const [color, setColor] = useState(initColor);
	return (
		<div className={styles.wrapper}>
			<ColorPicker
				defaultValue={initColor}
				format="hsl"
				onChange={
					(color) => {
						document.documentElement.style.setProperty('--hsl', color);
						setColor(color);
					}
				}
			/>
			{color}
		</div>
	);
}
