/* * */

import pt from '@/translations/pt-PT.json';

/* * */

type Messages = typeof pt;

declare global {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	interface IntlMessages extends Messages {}
}
