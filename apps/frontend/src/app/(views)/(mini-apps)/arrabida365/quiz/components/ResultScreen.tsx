import { PersonalityResult } from '../data';
import { Confetti } from './Confetti';
import styles from '../styles.module.css';

type ResultScreenProps = {
	result: PersonalityResult;
	resultImages: Record<string, any>;
	showConfetti: boolean;
	shareMessage: string;
	isSharing: boolean;
	onRestart: () => void;
	onShare: () => void;
	onCopyLink: () => void;
};

export function ResultScreen({
	result,
	resultImages,
	showConfetti,
	shareMessage,
	isSharing,
	onRestart,
	onShare,
	onCopyLink,
}: ResultScreenProps) {
	return (
		<div className={styles.contentContainer}>
			{showConfetti && <Confetti />}

			<div className={styles.resultContent}>
				<div className={styles.resultHeader}>
					<h2 className={styles.resultTitle}>És um {result.title}!</h2>
					<p className={styles.resultSubtitle}>{result.description}</p>
				</div>

				<div className={styles.rewardCard}>
					<div className={styles.cardAccent1}></div>
					<div className={styles.cardAccent2}></div>

					<div className={styles.resultIllustration}>
						<div className={styles.resultImageContainer}>
							<img
								src={resultImages[result.illustration]?.src || resultImages[result.illustration]}
								alt={result.title}
							/>
						</div>

						<div className={styles.resultBadge}>
							<div className={styles.badgeIcon}>
								<svg width="24" height="24" viewBox="0 0 24 24" fill="none">
									<path
										d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
										stroke="currentColor"
										strokeWidth="2"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
						</div>
					</div>

					<div className={styles.resultCardContent}>
						<h3 className={styles.routeTitle}>A Rota Perfeita Para Ti:</h3>

						<div className={styles.routeInfo}>
							<div className={styles.routeNumberBadge}>
								{result.routeNumber}
							</div>

							<div className={styles.routeName}>
								{result.routeName}
							</div>
						</div>

						<p className={styles.routeDescription}>
							{result.routeDescription}
						</p>
					</div>
				</div>

				<div className={styles.secondaryActions}>
					<button type="button" className={styles.outlineButton} onClick={onRestart}>
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none">
							<path
								d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Repetir Quiz
					</button>

					<button
						type="button"
						className={styles.textButton}
						onClick={() => window.open('https://carrismetropolitana.pt/arrabida365', '_blank', 'noopener,noreferrer')}
					>
						Voltar à Página Principal do Arrábida 365
					</button>
				</div>
			</div>

			{shareMessage && (
				<div className={styles.shareMessage}>{shareMessage}</div>
			)}

			<div className={styles.actionArea}>
				<div className={styles.shareButtons}>
					<button type="button" className={styles.primaryButton} onClick={onShare} disabled={isSharing}>
						<svg width="18" height="18" viewBox="0 0 24 24" fill="none">
							<path
								d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						Partilhar Resultado
					</button>

					<button type="button" className={styles.iconButton} onClick={onCopyLink} aria-label="Copiar Ligação">
						<svg width="20" height="20" viewBox="0 0 24 24" fill="none">
							<path
								d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
}