/* * */

import { UserDefault } from '@/schemas/User/default';

/* * */

const emailProviderConfig = {
  //
  from: 'contact@joao.earth',
  server: {
    host: process.env.EMAIL_SERVER_HOST,
    port: process.env.EMAIL_SERVER_PORT,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  },
  //
  profile(providerData) {
    return {
      ...UserDefault,
      email: providerData.email,
    };
  },
  //
};

/* * */

export default emailProviderConfig;
