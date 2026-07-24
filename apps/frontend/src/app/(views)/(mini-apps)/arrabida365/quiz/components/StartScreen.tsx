import styles from '../styles.module.css';

interface StartScreenProps {
	onStart: () => void
}

export function StartScreen({ onStart }: StartScreenProps) {
	return (
		<div className={styles.contentContainer}>
			<div className={styles.decorativeCircle1} />
			<div className={styles.decorativeCircle2} />
			<div className={styles.decorativeCircle3} />

			<div className={styles.startContent}>
				<div className={styles.cardStack}>
					<div className={`${styles.personalityCard} ${styles.card1}`}>
						<div className={styles.cardIcon}>
							<svg fill="none" height="30" viewBox="0 0 59 58" width="35">
								<path d="M45.8288 14.8809C49.8896 14.0178 52.4857 10.0202 51.6226 5.95935C50.7594 1.89854 46.7618 -0.697548 42.701 0.165605C38.6402 1.02876 36.0441 5.02639 36.9072 9.0872C37.7704 13.148 41.768 15.7441 45.8288 14.8809ZM6.34757 57.1093L36.2565 50.752L43.1543 49.2858L54.4483 46.8852C57.5569 46.2244 59.5321 43.1708 58.8733 40.0713C58.6544 39.0413 58.1542 38.0902 57.4331 37.3207L41.0645 20.0078C40.5564 19.4718 39.8141 19.2354 39.0967 19.3879C38.3793 19.5404 37.7973 20.0582 37.5493 20.7454L34.6606 28.9534L19.158 12.956C18.3438 12.1102 17.1426 11.7503 15.993 11.9946C15.993 11.9946 13.9016 13.0544 13.4926 14.1603L0.323952 50.1613C-0.017098 51.0893 -0.0916554 52.0953 0.11361 53.061C0.717674 55.9029 3.50567 57.7134 6.34757 57.1093Z" fill="#FFD300" />
							</svg>
						</div>
						<div className={styles.cardTitle}>Chill Rider</div>
						<div className={styles.cardSubtitle}>Viagens tranquilas</div>
					</div>

					<div className={`${styles.personalityCard} ${styles.card2}`}>
						<div className={styles.cardIcon}>
							<svg fill="none" height="28" viewBox="0 0 48 52" width="26">
								<path d="M28.8603 1.23078C40.3621 3.67557 48.815 8.86296 47.9374 12.9918L47.624 14.4664L41.3553 43.9582C41.0086 45.5895 39.4105 46.6273 37.7793 46.2805L37.1524 49.2297C36.8057 50.861 35.2076 51.8987 33.5763 51.552L30.6272 50.9251C28.9959 50.5784 27.9581 48.9804 28.3049 47.3491L28.9317 44.3999L11.2366 40.6387L10.6098 43.5879C10.263 45.2191 8.66499 46.2569 7.03373 45.9102L4.08455 45.2833C2.45328 44.9366 1.4155 43.3385 1.76223 41.7073L2.3891 38.7581C0.757837 38.4114 -0.279946 36.8133 0.0667898 35.182L6.33547 5.69025L6.64891 4.21566C7.52652 0.0868044 17.3585 -1.214 28.8603 1.23078Z" fill="#FFD300" />
							</svg>
						</div>
						<div className={styles.cardTitle}>Viajante da Arrábida</div>
						<div className={styles.cardSubtitle}>Percursos de verão</div>
					</div>

					<div className={`${styles.personalityCard} ${styles.card3} ${styles.cardCenter}`}>
						<div className={styles.cardIconCenter}>
							<svg fill="none" height="30" viewBox="0 0 68 60" width="34">
								<path d="M40.8826 31.5208L33.7875 28.9354L25.2639 52.3222H3.77778C1.68819 52.3222 0 54.0104 0 56.1C0 58.1896 1.68819 59.8778 3.77778 59.8778H64.2222C66.3118 59.8778 68 58.1896 68 56.1C68 54.0104 66.3118 52.3222 64.2222 52.3222H33.3035L40.8708 31.5208H40.8826ZM55.1792 31.4972L54.7896 32.5715L62.7819 35.4757C64.9187 36.2549 67.2681 34.9799 67.4569 32.7132C68.2243 23.4458 64.6354 14.3556 57.9181 8.09861C58.1542 9.04306 58.2958 10.0229 58.3194 11.0264L58.3431 11.7347C58.5556 18.4639 57.4812 25.1694 55.1792 31.4972ZM54.5417 11.1326C54.4118 7.07153 51.8854 3.48264 48.1194 1.99514C48.0132 1.94792 47.8951 1.9125 47.7889 1.86528C43.8931 0.484028 39.5486 1.58194 36.7979 4.675L36.3257 5.20625C32.1583 9.85764 28.9236 15.2764 26.775 21.1556L26.3854 22.2299L51.2361 31.2729L51.6257 30.1986C53.7625 24.3194 54.766 18.0979 54.5653 11.841L54.5417 11.1326ZM12.6556 12.7618C11.3451 14.6153 12.325 17.1062 14.4618 17.8854L22.8437 20.9312L23.2333 19.8569C25.5354 13.5292 29.0299 7.69722 33.516 2.67986L33.9882 2.14861C34.7201 1.33403 35.5347 0.613889 36.4083 0C27.0111 0.295139 18.1451 4.98194 12.6556 12.75V12.7618Z" fill="black" />
							</svg>
						</div>
						<div className={styles.cardTitle}>Amante de Praia</div>
						<div className={styles.cardSubtitle}>Sol e ondas</div>
					</div>

					<div className={`${styles.personalityCard} ${styles.card4}`}>
						<div className={styles.cardIcon}>
							<svg fill="none" height="24" viewBox="0 0 51 45" width="26">
								<path d="M17.6139 2.67325L16.3211 5.51869L9.26111 4.77666C5.92487 4.42601 2.92731 6.85339 2.57666 10.1896L0.0336876 34.3845C-0.316964 37.7207 2.11041 40.7183 5.44666 41.0689L41.7389 44.8834C45.0752 45.234 48.0727 42.8066 48.4234 39.4704L50.9663 15.2756C51.317 11.9393 48.8896 8.94176 45.5534 8.59111L38.4934 7.84908L37.8204 4.79703C37.4008 2.88004 35.8023 1.45071 33.846 1.24509L22.24 0.0252605C20.2836 -0.180362 18.4229 0.885401 17.6139 2.67325Z" fill="#FFD300" />
							</svg>
						</div>
						<div className={styles.cardTitle}>Caçador de Fotografias</div>
						<div className={styles.cardSubtitle}>Momentos perfeitos</div>
					</div>

					<div className={`${styles.personalityCard} ${styles.card5}`}>
						<div className={styles.cardIcon}>
							<svg fill="none" height="27" viewBox="0 0 45 51" width="24">
								<path d="M37.2771 0.0167787C35.7816 0.173954 25.628 4.26505 27.0425 17.7239L28.1428 28.192C28.4895 31.4913 31.4539 33.8918 34.7532 33.545L37.7441 33.2306L39.0015 45.1941C39.1753 46.8484 40.6524 48.0445 42.3067 47.8706C43.961 47.6967 45.1571 46.2197 44.9832 44.5654L43.7258 32.6019L42.6256 22.1339L40.5823 2.69329C40.4084 1.03897 38.9314 -0.157097 37.2771 0.0167787Z" fill="#FFD300" />
							</svg>
						</div>
						<div className={styles.cardTitle}>Explorador da Natureza</div>
						<div className={styles.cardSubtitle}>Trilhos e paisagens</div>
					</div>
				</div>

				<div className={styles.textContent}>
					<h1 className={styles.mainHeading}>Que tipo de passageiro<br />da Arrábida és tu?</h1>
					<p className={styles.description}>
						Faz o nosso quiz rápido de 5 perguntas<br />
						para descobrires a tua personalidade<br />
						de viagem e encontrares o percurso<br />
						de verão ideal para ti.
					</p>
					<div className={styles.metaBadges}>
						<div className={styles.badge}>
							<svg fill="none" height="12" viewBox="0 0 21 21" width="12">
								<path d="M10.5 5.5V10.5L13.5 13.5M1.5 10.5C1.5 11.6819 1.73279 12.8522 2.18508 13.9442C2.63738 15.0361 3.30031 16.0282 4.13604 16.864C4.97177 17.6997 5.96392 18.3626 7.05585 18.8149C8.14778 19.2672 9.3181 19.5 10.5 19.5C11.6819 19.5 12.8522 19.2672 13.9442 18.8149C15.0361 18.3626 16.0282 17.6997 16.864 16.864C17.6997 16.0282 18.3626 15.0361 18.8149 13.9442C19.2672 12.8522 19.5 11.6819 19.5 10.5C19.5 8.11305 18.5518 5.82387 16.864 4.13604C15.1761 2.44821 12.8869 1.5 10.5 1.5C8.11305 1.5 5.82387 2.44821 4.13604 4.13604C2.44821 5.82387 1.5 8.11305 1.5 10.5Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
							</svg>
							<span>1 min</span>
						</div>
						<div className={styles.badge}>
							<svg fill="none" height="12" viewBox="0 0 18 16" width="12">
								<path d="M5.5 1.5H16.5M5.5 7.5H16.5M5.5 13.5H16.5M1.5 1.5V1.51M1.5 7.5V7.51M1.5 13.5V13.51" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" />
							</svg>
							<span>5 Perguntas</span>
						</div>
					</div>
				</div>
			</div>

			<div className={styles.actionArea}>
				<button className={styles.primaryButton} onClick={onStart} type="button">
					Começar o Quiz
					<svg fill="none" height="16" viewBox="0 0 16 16" width="16">
						<path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
					</svg>
				</button>
			</div>
		</div>
	);
}
