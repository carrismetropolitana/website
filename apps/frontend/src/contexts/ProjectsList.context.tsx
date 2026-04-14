'use client';

/* * */

import type { Project } from '@/types/projects.type';

import { useLocaleContext } from '@/contexts/Locale.context';
import { DEFAULT_LOCALE_CODE, getMatchingLocale } from '@/i18n/config';
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

	const localeContext = useLocaleContext();
	const currentLocale = localeContext.data.current_locale;

	//
	// B. Fetch data

	const matchingLocale = getMatchingLocale(currentLocale) ?? getMatchingLocale(DEFAULT_LOCALE_CODE);
	const normalizedLocaleCode = matchingLocale?._id ?? DEFAULT_LOCALE_CODE;
	const payloadLocale = normalizedLocaleCode === 'en' ? 'en' : 'pt-PT';
	const projectsApiUrl = `${getPublicVariable('server_url_backoffice')}/admin/public-api/projects?locale=${payloadLocale}`;
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
