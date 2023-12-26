/* * */

import NextAuth from 'next-auth';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import mongodbAdapterConfig from './mongodb.adapter';

import GitHub from 'next-auth/providers/github';
import githubProviderConfig from './github.provider';

import EmailProvider from 'next-auth/providers/email';
import emailProviderConfig from './email.provider';

import signInCallback from './signIn.callback';
import sessionCallback from './session.callback';

/* * */

const authjs = NextAuth({
  session: { strategy: 'database' },
  adapter: MongoDBAdapter(mongodbAdapterConfig),
  providers: [EmailProvider(emailProviderConfig), GitHub(githubProviderConfig)],
  pages: {
    signIn: '/login',
    error: '/login/error',
    verifyRequest: '/login/verify',
  },
  callbacks: {
    signIn: signInCallback,
    session: sessionCallback,
  },
});

/* * */

export const {
  handlers: { GET, POST },
  auth,
} = authjs;
