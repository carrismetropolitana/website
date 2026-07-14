import styles from '../styles.module.css';
import carrisLogo from '../assets/carris-logo.svg';
import arrabidaLogo from '../assets/arrabida-365-logo.svg';

export function QuizHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<a
					href="https://carrismetropolitana.pt/"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.carrisLogo}
				>
					<img src={carrisLogo.src} alt="Carris Metropolitana" />
				</a>

				<div className={styles.divider}></div>

				<a
					href="https://carrismetropolitana.pt/arrabida365"
					target="_blank"
					rel="noopener noreferrer"
					className={styles.arrabidaLogo}
				>
					<img src={arrabidaLogo.src} alt="Arrábida 365" />
				</a>
			</div>
		</header>
	);
}