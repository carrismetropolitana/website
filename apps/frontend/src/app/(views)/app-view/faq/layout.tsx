/* * */

import { FaqsContextProvider } from '@/contexts/Faqs.context';

/* * */

export default function Layout({ children }) {
	return (
		<FaqsContextProvider>
			{children}
		</FaqsContextProvider>
	);
}
