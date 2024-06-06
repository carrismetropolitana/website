import { ActionIcon } from '@mantine/core';
import { IconPlayerPause, IconVolume } from '@tabler/icons-react';
import { useEffect, useMemo, useState } from 'react';

import styles from './AudioBadge.module.css';

/* * */

const BASE_TTS_URL = 'https://storage.carrismetropolitana.pt/static/tts/live';

/* * */

export default function AudioBadge({ id, type }) {
	//

	//
	// A. Setup variables

	const [playing, setPlaying] = useState(false);

	const audio = useMemo(() => {
		return new Audio(`${BASE_TTS_URL}/${type}/${id}.mp3`);
	}, [id, type]);

	//
	// D. Render components

	useEffect(() => {
		audio.addEventListener('ended', () => setPlaying(false));
		return () => audio.removeEventListener('ended', () => setPlaying(false));
	}, [audio]);

	useEffect(() => {
		audio.addEventListener('loadstart', () => setPlaying(false));
		return () => audio.removeEventListener('loadstart', () => setPlaying(false));
	}, [audio]);

	useEffect(() => {
		return () => {
			audio.pause();
			audio.currentTime = 0;
		};
	}, [audio]);

	const handleTogglePlay = () => {
		if (playing) {
			audio.pause();
			audio.currentTime = 0;
			setPlaying(false);
		}
		else {
			audio.play();
			setPlaying(true);
		}
	};

	//
	// D. Render components

	return (
		audio
		&& !audio.error
		&& (
			<ActionIcon className={`${styles.container} ${playing && styles.playing}`} onClick={handleTogglePlay} size="sm">
				{playing ? <IconPlayerPause size={16} /> : <IconVolume size={16} />}
			</ActionIcon>
		)

	);
}
