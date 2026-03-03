/* THIS FILE WAS GENERATED AUTOMATICALLY BY PAYLOAD. */
/* DO NOT MODIFY IT BECAUSE IT COULD BE REWRITTEN AT ANY TIME. */
import type { ServerFunctionClient } from 'payload';

import '@payloadcms/next/css';
import config from '@/payload-config';
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';
import React from 'react';

import { importMap } from './importMap.js';
import './custom.scss';
import { LinesContextProvider } from '@/contexts/Lines.context';
import { ConfigProviders } from '@/providers/config-providers';

interface Args {
	children: React.ReactNode
}

const serverFunction: ServerFunctionClient = async function (args) {
	'use server';
	return handleServerFunctions({
		...args,
		config,
		importMap,
	});
};

const Layout = ({ children }: Args) => (
	<RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
		<ConfigProviders>
			<LinesContextProvider>			
				{children}
			</LinesContextProvider>
		</ConfigProviders>
	</RootLayout>
);

export default Layout;
