import styles from '../styles.module.css';

import arrabidaLogo from '../assets/arrabida-365-logo.svg';
import carrisLogo from '../assets/carris-logo.svg';

export function QuizHeader() {
	return (
		<header className={styles.header}>
			<div className={styles.headerContainer}>
				<a
					className={styles.carrisLogo}
					href="https://carrismetropolitana.pt/"
					rel="noopener noreferrer"
					target="_blank"
				>
					<img alt="Carris Metropolitana" src={carrisLogo.src} />
				</a>

				<div className={styles.divider} />

				<a
					className={styles.arrabidaLogo}
					href="https://carrismetropolitana.pt/arrabida365"
					rel="noopener noreferrer"
					target="_blank"
				>
					<img alt="Arrábida 365" src={arrabidaLogo.src} />
				</a>
			</div>
		</header>
	);
}
