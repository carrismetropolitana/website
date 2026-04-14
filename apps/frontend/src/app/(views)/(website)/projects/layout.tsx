/* * */

import { ProjectsListContextProvider } from '@/contexts/ProjectsList.context';

/* * */

export default function Layout({ children }) {
	return (
		<ProjectsListContextProvider>
			{children}
		</ProjectsListContextProvider>
	);
}
