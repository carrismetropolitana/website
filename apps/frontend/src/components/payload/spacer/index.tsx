/* * */

import React, { type ReactElement } from 'react';

interface Props {
	height?: number
}

/* * */

export function Spacer({ height = 32 }: Props): ReactElement {
	return <div style={{ height: `${height}px` }} />;
}
