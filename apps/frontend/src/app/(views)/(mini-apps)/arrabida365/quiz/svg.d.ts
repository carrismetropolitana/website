declare module '*.svg' {
	const src: {
		blurDataURL?: string
		height: number
		src: string
		width: number
	};

	export default src;
}
