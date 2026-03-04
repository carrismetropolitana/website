/* * */

'use client';

/* * */

import { PipsArrivalsTable } from '@/components/pips/display/PipsArrivalsTable';
import { PipsArrivalsContextProvider } from '@/contexts/PipsArrivals.context';
import { useStopsPipContext } from '@/contexts/StopsPip.context';

import styles from './styles.module.css';

import { PipsHeader } from '../PipsHeader';

/* * */

export function PipsDisplay() {
	const stopsPipContext = useStopsPipContext();
	const { orientation, rotation, scale } = stopsPipContext.display;
	const isVertical = orientation === 'vertical';
	const viewportWidth = `${100 / scale}vw`;
	const viewportHeight = `${100 / scale}vh`;

	const scalerStyle: React.CSSProperties = {
		height: viewportHeight,
		transform: `scale(${scale})`,
		transformOrigin: 'top left',
		width: viewportWidth,
	};

	const canvasStyle: React.CSSProperties = isVertical
		? {
			height: viewportWidth,
			transform: rotation === 'ccw'
				? `translateY(${viewportHeight}) rotate(-90deg)`
				: `translateX(${viewportWidth}) rotate(90deg)`,
			transformOrigin: 'top left',
			width: viewportHeight,
		}
		: {
			height: '100%',
			width: '100%',
		};

	return (
		<div className={styles.root} data-orientation={orientation} data-rotation={rotation}>
			<div className={styles.scaler} style={scalerStyle}>
				<div className={styles.canvas} style={canvasStyle}>
					<div className={styles.content}>
						<PipsHeader />
						<PipsArrivalsContextProvider>
							<div className={styles.tableViewport}>
								<PipsArrivalsTable />
							</div>
						</PipsArrivalsContextProvider>
					</div>
				</div>
			</div>
		</div>
	);
}
