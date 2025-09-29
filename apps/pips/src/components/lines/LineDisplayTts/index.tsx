'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { audioTtsUrl } from '@/settings/urls.settings';
import { IconPlayerPause, IconVolume } from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

import styles from './styles.module.css';

/* * */

interface Props {
	patternId?: string
}

/* * */

export function LineDisplayTts({ patternId }: Props) {
	//

	//
	// A. Setup variables

	const [isPlaying, setIsPlaying] = useState(false);
	const audioPlayer = useRef<HTMLAudioElement | null>(null);
	const analyticsContext = useAnalyticsContext();

	//
	// B. Transform data

	useEffect(() => {
		audioPlayer.current = new Audio(`${audioTtsUrl}/patterns/${patternId}.mp3`);
	}, [patternId]);

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
	}, [patternId]);

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
		analyticsContext.actions.capture(ampli => ampli.stopAudioPlayed({ audio_played: 'true', stop_id: patternId || '' }));
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
