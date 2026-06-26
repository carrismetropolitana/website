import styles from '../styles.module.css';

type AfterShareScreenProps = {
	afterShareBus: {
		src: string;
	};
	onBackToResult: () => void;
};

export function AfterShareScreen({
	afterShareBus,
	onBackToResult,
}: AfterShareScreenProps) {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.afterShareContent}>
				<div className={styles.afterShareIllustration}>
					<div className={styles.illustrationGlow}></div>
					<img src={afterShareBus.src} alt="Bus illustration" />
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
						type="button"
						className={styles.primaryButton}
						onClick={() => window.open('https://carrismetropolitana.pt/arrabida365', '_blank', 'noopener,noreferrer')}
					>
						Ir para a Arrábida 365
						<div className={styles.buttonIconCircle}>
							<svg width="10" height="10" viewBox="0 0 16 16" fill="none">
								<path d="M6 4l4 4-4 4" stroke="#FFD300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
							</svg>
						</div>
					</button>

					<div className={styles.afterShareSecondary}>
						<span className={styles.afterShareHint}>Queres ver o teu perfil novamente?</span>
						<button type="button" className={styles.linkButton} onClick={onBackToResult}>
							Voltar ao resultado
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}