let timer;
let latestTouchTap = { time: 0, target: null };

export default function useDoubleClick({ onDoubleClick = () => {}, onSingleClick = () => {} }, maxDelay = 200) {
  return (event) => {
    clearTimeout(timer);

    const touchTap = { time: new Date().getTime(), target: event.currentTarget };

    const isDoubleClick = touchTap.target === latestTouchTap.target && touchTap.time - latestTouchTap.time < maxDelay;

    latestTouchTap = touchTap;

    timer = setTimeout(() => {
      if (isDoubleClick) onDoubleClick(event);
      else onSingleClick(event);
    }, maxDelay);
  };
}
