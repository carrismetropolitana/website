/* * */

import { useEffect, useRef, useState } from 'react';

/* * */

interface RootMarginProps {
	bottom?: string
	left?: string
	right?: string
	top?: string
}

interface OffsetValueProps {
	bottom?: number
	left?: number
	right?: number
	top?: number
}

const defaultRootMargin: RootMarginProps = { bottom: '0px', left: '0px', right: '0px', top: '-1px' };
const defaultOffsetValue: OffsetValueProps = { bottom: 0, left: 0, right: 0, top: 0 };

/* * */

export const useStickyObserver = (rootMargin?: RootMarginProps, threshold: number[] = [1], offsetValue?: OffsetValueProps, negativeValues = true) => {
	//

	//
	// A. Setup variables

	const ref = useRef<HTMLDivElement>(null);
	const [isSticky, setIsSticky] = useState(false);

	//
	// B. Transform data

	const preparedRootMargin = { ...defaultRootMargin, ...rootMargin };
	const preparedOffsetValue = { ...defaultOffsetValue, ...offsetValue };

	if (preparedRootMargin.top) preparedRootMargin.top = `${parseInt(preparedRootMargin.top) * (negativeValues ? -1 : 1) + (preparedOffsetValue.top ?? 0)}px`;
	if (preparedRootMargin.right) preparedRootMargin.right = `${parseInt(preparedRootMargin.right) * (negativeValues ? -1 : 1) + (preparedOffsetValue.right ?? 0)}px`;
	if (preparedRootMargin.left) preparedRootMargin.left = `${parseInt(preparedRootMargin.left) * (negativeValues ? -1 : 1) + (preparedOffsetValue.left ?? 0)}px`;
	if (preparedRootMargin.bottom) preparedRootMargin.bottom = `${parseInt(preparedRootMargin.bottom) * (negativeValues ? -1 : 1) + (preparedOffsetValue.bottom ?? 0)}px`;

	//
	// C. Setup hook

	useEffect(() => {
		// Exit early if the ref is not set
		if (!ref.current) return;
		// Setup the observer
		const observer = new IntersectionObserver(
			([event]) => setIsSticky(event.intersectionRatio < 1),
			{ rootMargin: `${preparedRootMargin.top} ${preparedRootMargin.right} ${preparedRootMargin.bottom} ${preparedRootMargin.left}`, threshold: threshold },
		);
		observer.observe(ref.current);
		// Remove the observer on cleanup
		return () => {
			observer.disconnect();
		};
	}, [ref, preparedRootMargin, offsetValue, threshold]);

	return { isSticky, ref };

	//
};
