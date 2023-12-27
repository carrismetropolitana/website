/* * */

import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import MONGODB from '@/services/MONGODB';

import GitHub from 'next-auth/providers/github';
import githubProviderConfig from './github.provider';

import EmailProvider from 'next-auth/providers/email';
import emailProviderConfig from './email.provider';

import signInCallback from './signIn.callback';
import sessionCallback from './session.callback';
import redirectCallback from './redirect.callback';

/* * */

const authConfig = {
  session: { strategy: 'database' },
  adapter: MongoDBAdapter(MONGODB.connection),
  providers: [EmailProvider(emailProviderConfig), GitHub(githubProviderConfig)],
  pages: {
    signIn: '/login',
    error: '/login/error',
    verifyRequest: '/login/verify',
  },
  callbacks: {
    signIn: signInCallback,
    session: sessionCallback,
    redirect: redirectCallback,
  },
};

/* * */

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
