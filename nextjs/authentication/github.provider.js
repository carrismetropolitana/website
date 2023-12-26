/* * */

import { UserDefault } from '@/schemas/User/default';

/* * */

const githubProviderConfig = {
  //
  clientId: process.env.AUTH_GITHUB_ID,
  clientSecret: process.env.AUTH_GITHUB_SECRET,
  //
  account() {},
  //
  profile(providerData) {
    return {
      ...UserDefault,
      id: providerData.id,
      display_name: providerData.name,
      email: providerData.email,
    };
  },
  //
};

/* * */

export default githubProviderConfig;
