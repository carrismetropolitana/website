let timer;
let latestTouchTap = { target: null, time: 0 };

export default function useDoubleClick({ onDoubleClick = () => null, onSingleClick = () => null }, maxDelay = 200) {
	return (event) => {
		clearTimeout(timer);

		const touchTap = { target: event.currentTarget, time: (new Date()).getTime() };

		const isDoubleClick = touchTap.target === latestTouchTap.target && touchTap.time - latestTouchTap.time < maxDelay;

		latestTouchTap = touchTap;

		timer = setTimeout(() => {
			if (isDoubleClick) onDoubleClick(event);
			else onSingleClick(event);
		}, maxDelay);
	};
}
