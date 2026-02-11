/* * */

type Listener = (headingKey: null | string) => void;

/* * */

const listeners = new Set<Listener>();

/* * */

export function openAnchorPopover(headingKey: string): void {
	listeners.forEach(fn => fn(headingKey));
}

/* * */

export function closeAnchorPopover(): void {
	listeners.forEach(fn => fn(null));
}

/* * */

export function subscribeAnchorPopover(listener: Listener): () => void {
	listeners.add(listener);
	return () => listeners.delete(listener);
}

/* * */
