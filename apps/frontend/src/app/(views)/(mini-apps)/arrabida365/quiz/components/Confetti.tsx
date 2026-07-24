/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from '../styles.module.css';

export function Confetti() {
	return (
		<div className={styles.confettiContainer}>
			{[...Array(80)].map((_, i) => {
				const colors = ['#FFD300', '#000000', '#D9D9D9', '#F5F5F5', '#6B7280'];
				const color = colors[Math.floor(Math.random() * colors.length)];
				const leftPosition = Math.random() * 100;
				const animationDuration = 3 + Math.random() * 4;
				const drift = (Math.random() - 0.5) * 200;
				const size = 8 + Math.random() * 8;
				const delay = Math.random() * 2;

				return (
					<div
						key={i}
						className={styles.confetti}
						style={{
							['--drift' as any]: `${drift}px`,
							animationDelay: `${delay}s`,
							animationDuration: `${animationDuration}s`,
							backgroundColor: color,
							height: `${size * 2}px`,
							left: `${leftPosition}%`,
							width: `${size}px`,
						}}
					/>
				);
			})}
		</div>
	);
}
