/* * */

// import MONGOOSE from '@/services/MONGOOSE';
// import { UserModel } from '@/schemas/User/model';

/* * */

const redirectCallback = async ({ url, baseUrl }) => {
  //

  //   console.log('----------------------------');
  //   console.log('redirectCallback(url)', url);
  //   console.log('redirectCallback(baseUrl)', baseUrl);
  //   console.log('----------------------------');

  // If the URL is requesting a JWT token
  if (url.includes('returnToken=true')) {
    return `${baseUrl}${url}`;
  }

  // Allows relative callback URLs
  if (url.startsWith('/')) return `${baseUrl}${url}`;
  // Allows callback URLs on the same origin
  else if (new URL(url).origin === baseUrl) return url;
  return baseUrl;

  //
};

/* * */

export default redirectCallback;
