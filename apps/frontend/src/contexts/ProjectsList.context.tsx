'use client';

/* * */

import type { Project } from '@/types/projects.type';

import { getPublicVariable } from '@carrismetropolitana/website-shared-settings';
import { createContext, useContext } from 'react';
import useSWR from 'swr';

/* * */

interface ProjectsListContextState {
	data: {
		raw: Project[]
	}
	flags: {
		is_loading: boolean
	}
}

/* * */

const ProjectsListContext = createContext<null | ProjectsListContextState>(null);

export function useProjectsListContext() {
	const context = useContext(ProjectsListContext);
	if (!context) {
		throw new Error('useCampaignsListContext must be used within a CampaignsListContextProvider');
	}
	return context;
}

/* * */

export const ProjectsListContextProvider = ({ children }) => {
	//

	//
	// B. Fetch data

	const projectsApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/projects`;
	const { data: allProjectsData, isLoading: allProjectsLoading } = useSWR<Project[], Error>(projectsApiUrl, { refreshInterval: 900000 }); // 15 minutes

	//
	// E. Define context value

	const contextValue: ProjectsListContextState = {
		data: {
			raw: allProjectsData || [],
		},
		flags: {
			is_loading: allProjectsLoading,
		},
	};

	//
	// F. Render components

	return (
		<ProjectsListContext.Provider value={contextValue}>
			{children}
		</ProjectsListContext.Provider>
	);

	//
};
