declare module '*.svg' {
	const src: {
		src: string;
		height: number;
		width: number;
		blurDataURL?: string;
	};

	export default src;
}