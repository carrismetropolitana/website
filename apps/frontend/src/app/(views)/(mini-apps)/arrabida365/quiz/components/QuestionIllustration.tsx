/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from '../styles.module.css';

interface QuestionIllustrationProps {
	illustration?: string
	questionIllustrations: Record<string, any>
}

function getImageSrc(image: any) {
	if (typeof image === 'string') return image;
	return image?.src ?? '';
}

export function QuestionIllustration({
	illustration,
	questionIllustrations,
}: QuestionIllustrationProps) {
	if (!illustration || !questionIllustrations[illustration]) return null;

	const imageSrc = getImageSrc(questionIllustrations[illustration]);

	return (
		<div className={styles.illustrationContainer}>
			<div className={styles.illustrationGlow} />
			<img
				alt=""
				className={styles.questionIllustration}
				src={imageSrc}
			/>
		</div>
	);
}
