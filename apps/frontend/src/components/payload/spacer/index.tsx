/* * */

interface Props {
	height: number
}

/* * */

export function Spacer({ height = 32 }: Props) {
	//

	//
	// A. Render components

	return (
		<div style={{ height: `${height}px` }} />
	);

	//
}
