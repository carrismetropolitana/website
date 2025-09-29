/* * */

interface Props {
	coverImageSrc: string
	title: string
}

/* * */

export function OpenGraphNewsDynamic({ coverImageSrc, title }: Props) {
	return (
		<div style={{ backgroundColor: '#fff', display: 'flex', height: '100%', width: '100%' }}>
			<img alt={title} src={coverImageSrc} />
		</div>
	);
}
