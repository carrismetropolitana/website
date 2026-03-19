/* * */

import React, { type ReactElement } from 'react';

interface Props {
	height?: number
}

/* * */

export function Spacer({ height = 20 }: Props): ReactElement {
	return <div style={{ height: `${height}px` }} />;
}
