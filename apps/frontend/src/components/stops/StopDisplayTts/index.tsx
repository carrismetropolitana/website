'use client';

/* * */

import { useAnalyticsContext } from '@/contexts/Analytics.context';
import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { IconPlayerPause, IconVolume } from '@tabler/icons-react';
import { type File } from '@tmlmobilidade/types';
import { useEffect, useRef, useState } from 'react';
import useSWR from 'swr';

import styles from './styles.module.css';

/* * */

interface Props {
	stopId?: string
}

interface StopTtsResponse {
	file: File | null
}

/* * */

export function StopDisplayTts({ stopId }: Props) {
	//

	//
	// A. Setup variables

	const { data: stopTtsData, error: stopTtsError, isLoading: stopTtsLoading } = useSWR<StopTtsResponse, Error>(stopId ? getPublicVariable('go_api_url') + '/stops/api/stops/tts/tts-' + stopId : null);
	const audioUrl = stopTtsData?.file?.url;
	const [isPlaying, setIsPlaying] = useState(false);
	const audioRef = useRef<HTMLAudioElement | null>(null);
	const analyticsContext = useAnalyticsContext();

	//
	// B. Transform data

	useEffect(() => {
		return () => {
			audioRef.current?.pause();
			audioRef.current = null;
			setIsPlaying(false);
		};
	}, [stopId]);

	//
	// C. Handle actions

	const handleToggleAudio = async () => {
		if (!audioUrl || !stopId) return;

		if (isPlaying) {
			audioRef.current?.pause();
			return;
		}

		audioRef.current?.pause();

		const audio = new Audio(audioUrl);
		audio.onplaying = () => setIsPlaying(true);
		audio.onpause = () => setIsPlaying(false);
		audio.onabort = () => setIsPlaying(false);
		audio.onended = () => {
			audioRef.current = null;
			setIsPlaying(false);
		};
		audioRef.current = audio;

		try {
			await audio.play();
			analyticsContext.actions.capture(ampli => ampli.stopAudioPlayed({ audio_played: 'true', stop_id: stopId }));
		}
		catch {
			audioRef.current = null;
			setIsPlaying(false);
		}
	};

	//
	// D. Render components

	if (!stopId || stopTtsLoading || stopTtsError || !audioUrl) return null;

	return (
		<div className={`${styles.container} ${isPlaying && styles.isPlaying}`} onClick={handleToggleAudio}>
			{isPlaying ? <IconPlayerPause /> : <IconVolume />}
		</div>
	);

	//
}
