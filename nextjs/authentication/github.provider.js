/* * */

import { UserDefault } from '@/schemas/User/default';

/* * */

const githubProviderConfig = {
  //
  clientId: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
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
