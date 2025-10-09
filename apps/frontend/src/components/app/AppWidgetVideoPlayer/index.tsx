/* * */

import styles from './styles.module.css';

/* * */

interface AppWidgetVideoPlayerProps {
	videoUrl: string
}

/* * */

export function AppWidgetVideoPlayer({ videoUrl }: AppWidgetVideoPlayerProps) {
	return (
		<video className={styles.videoPlayer} autoPlay controls>
			<source src={videoUrl} type="video/mp4" />
			Your browser does not support the video tag.
		</video>
	);
}
