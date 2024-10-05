'use client';

/* * */

import { audioTtsUrl } from '@/settings/urls.settings';
import { IconPlayerPause, IconVolume } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	stopId?: string
}

/* * */

export function StopDisplayTts({ stopId }: Props) {
	//

	//
	// A. Setup variables

	const [isPlaying, setIsPlaying] = useState(false);
	const audioPlayer = useRef<HTMLAudioElement | null>(null);

	//
	// B. Transform data

	useEffect(() => {
		audioPlayer.current = new Audio(`${audioTtsUrl}/stops/${stopId}.mp3`);
	}, [stopId]);

	useEffect(() => {
		if (audioPlayer.current) {
			audioPlayer.current.onplaying = () => setIsPlaying(true);
			audioPlayer.current.onpause = () => setIsPlaying(false);
			audioPlayer.current.onabort = () => setIsPlaying(false);
		}
		return () => {
			if (audioPlayer.current) {
				audioPlayer.current.onplaying = null;
				audioPlayer.current.onpause = null;
				audioPlayer.current.onabort = null;
			}
		};
	}, [stopId]);

	//
	// C. Handle actions

	const handleToogleAudio = () => {
		if (isPlaying) {
			audioPlayer.current?.pause();
		}
		else {
			audioPlayer.current?.load();
			audioPlayer.current?.play();
		}
	};

	//
	// D. Render components

	return audioPlayer && (
		<div className={`${styles.container} ${isPlaying && styles.isPlaying}`} onClick={handleToogleAudio}>
			{isPlaying
				? <IconPlayerPause />
				: <IconVolume />}
		</div>
	);

	//
}
