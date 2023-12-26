/* * */

import MONGOOSE from '@/services/MONGOOSE';
import { UserModel } from '@/schemas/User/model';

/* * */

const sessionCallback = async ({ session, token, user }) => {
  //

  //   console.log('----------------------------');
  //   console.log('sessionCallback(user)', user);
  //   console.log('----------------------------');

  if (!user) throw new Error('Authentication failed: No user found.');

  //   await MONGOOSE.connect();

  //   const foundUser = await UserModel.findOneAndUpdate({ _id: session.user.id }, { last_active: new Date() }, { new: true });
  //   if (foundUser) session.user = foundUser;
  return session;

  //
};

/* * */

export default sessionCallback;
