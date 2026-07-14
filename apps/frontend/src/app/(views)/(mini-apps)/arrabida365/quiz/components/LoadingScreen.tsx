import styles from '../styles.module.css';

export function LoadingScreen() {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.loadingContent}>
				<div className={styles.loadingAnimation}>
					<div className={styles.loadingGlow} />
					<div className={styles.loadingCircle}>
						<div className={styles.loadingShimmer} />
						<div className={styles.loadingIcon}>
							<svg aria-hidden="true" focusable="false" height="48" role="img" viewBox="0 0 576 512" width="48" xmlns="http://www.w3.org/2000/svg">
								<path d="M288 0C422.4 0 512 35.2 512 80V96l0 32c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32l0 160c0 17.7-14.3 32-32 32v32c0 17.7-14.3 32-32 32H416c-17.7 0-32-14.3-32-32V448H192v32c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32l0-32c-17.7 0-32-14.3-32-32l0-160c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h0V96h0V80C64 35.2 153.6 0 288 0zM128 160v96c0 17.7 14.3 32 32 32H272V128H160c-17.7 0-32 14.3-32 32zM304 288H416c17.7 0 32-14.3 32-32V160c0-17.7-14.3-32-32-32H304V288zM144 400a32 32 0 1 0 0-64 32 32 0 1 0 0 64zm288 0a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM384 80c0-8.8-7.2-16-16-16H208c-8.8 0-16 7.2-16 16s7.2 16 16 16H368c8.8 0 16-7.2 16-16z" fill="currentColor" />
							</svg>
						</div>
					</div>

					<div className={`${styles.floatingIcon} ${styles.floatingIcon1}`}>
						<svg aria-hidden="true" focusable="false" height="32" role="img" viewBox="0 0 512 512" width="32" xmlns="http://www.w3.org/2000/svg">
							<path d="M512 96c0 50.2-59.1 125.1-84.6 155c-3.8 4.4-9.4 6.1-14.5 5H320c-17.7 0-32 14.3-32 32s14.3 32 32 32h96c53 0 96 43 96 96s-43 96-96 96H139.6c8.7-9.9 19.3-22.6 30-36.8c6.3-8.4 12.8-17.6 19-27.2H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320c-53 0-96-43-96-96s43-96 96-96h39.8c-21-31.5-39.8-67.7-39.8-96c0-53 43-96 96-96s96 43 96 96zM117.1 489.1c-3.8 4.3-7.2 8.1-10.1 11.3l-1.8 2-.2-.2c-6 4.6-14.6 4-20-1.8C59.8 473 0 402.5 0 352c0-53 43-96 96-96s96 43 96 96c0 30-21.1 67-43.5 97.9c-10.7 14.7-21.7 28-30.8 38.5l-.6 .7zM128 352a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zM416 128a32 32 0 1 0 0-64 32 32 0 1 0 0 64z" fill="currentColor" />
						</svg>
					</div>

					<div className={`${styles.floatingIcon} ${styles.floatingIcon2}`}>
						<svg aria-hidden="true" focusable="false" height="28" role="img" viewBox="0 0 640 512" width="28" xmlns="http://www.w3.org/2000/svg">
							<path d="M560 160A80 80 0 1 0 560 0a80 80 0 1 0 0 160zM55.9 512H381.1h75H578.9c33.8 0 61.1-27.4 61.1-61.1c0-11.2-3.1-22.2-8.9-31.8l-132-216.3C495 196.1 487.8 192 480 192s-15 4.1-19.1 10.7l-48.2 79L286.8 81c-6.6-10.6-18.3-17-30.8-17s-24.1 6.4-30.8 17L8.6 426.4C3 435.3 0 445.6 0 456.1C0 487 25 512 55.9 512z" fill="currentColor" />
						</svg>
					</div>
				</div>

				<div className={styles.loadingText}>
					<h2 className={styles.loadingTitle}>A analisar as tuas respostas</h2>
					<p className={styles.loadingDescription}>
						Estamos a encontrar o percurso<br />
						ideal na Arrábida para ti
					</p>
				</div>

				<div className={styles.loadingProgressBar}>
					<div className={styles.loadingProgressFill} />
				</div>

				<div className={styles.loadingDots}>
					<div className={`${styles.dot} ${styles.dot1}`} />
					<div className={`${styles.dot} ${styles.dot2}`} />
					<div className={`${styles.dot} ${styles.dot3}`} />
				</div>
			</div>
		</div>
	);
}
