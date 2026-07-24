import styles from '../styles.module.css';

interface AfterShareScreenProps {
	afterShareBus: {
		src: string
	}
	onBackToResult: () => void
}

export function AfterShareScreen({
	afterShareBus,
	onBackToResult,
}: AfterShareScreenProps) {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.afterShareContent}>
				<div className={styles.afterShareIllustration}>
					<div className={styles.illustrationGlow} />
					<img alt="Bus illustration" src={afterShareBus.src} />
				</div>

				<div className={styles.afterShareMessage}>
					<h2 className={styles.afterShareTitle}>Pronto para explorar?</h2>
					<p className={styles.afterShareDescription}>
						Já descobriste o teu perfil de passageiro.<br />
						Agora está na hora de consultar as<br />
						linhas, os horários e começar a<br />
						tua aventura de verão com a Arrábida 365.
					</p>
				</div>

				<div className={styles.afterShareCta}>
					<button
						className={styles.primaryButton}
						onClick={() => window.open('https://carrismetropolitana.pt/arrabida365', '_blank', 'noopener,noreferrer')}
						type="button"
					>
						Ir para a Arrábida 365
						<div className={styles.buttonIconCircle}>
							<svg fill="none" height="10" viewBox="0 0 16 16" width="10">
								<path d="M6 4l4 4-4 4" stroke="#FFD300" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
							</svg>
						</div>
					</button>

					<div className={styles.afterShareSecondary}>
						<span className={styles.afterShareHint}>Queres ver o teu perfil novamente?</span>
						<button className={styles.linkButton} onClick={onBackToResult} type="button">
							Voltar ao resultado
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}
