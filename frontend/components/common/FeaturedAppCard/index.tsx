import styles from './styles.module.css';

export default function Component({ description, imageUrl, title, url }: { description: string, imageUrl: string, title: string, url?: string }) {
	const base = (
		<div className={styles.card}>
			<img alt={title} src={imageUrl} />
			<div className={styles.content}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</div>
	);
	if (!url) return base;
	else
		return (
			<a href={url} target="_blank">
				{base}
			</a>
		);
}
