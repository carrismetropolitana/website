/* * */

import mongoose from 'mongoose';

/* * */

export const UserSchema = new mongoose.Schema({
  //
  display_name: { type: String, maxlength: 25 },
  //
  phone: { type: String, maxlength: 50 },
  email: { type: String, maxlength: 50, unique: true },
  //
  favorite_stops: [{ type: String, maxlength: 6 }],
  favorite_patterns: [{ type: String, maxlength: 50 }],
  //
  send_newsletter: { type: Boolean, default: true },
  send_notifications: { type: Boolean, default: true },
  //
  registration_date: { type: Date },
  last_active: { type: Date },
  //
  permissions: {
    //
    admin: {
      backoffice: { type: Boolean, default: false },
      debug: { type: Boolean, default: false },
    },
    //
  },
  //
});

/* * */

export const UserModel = mongoose?.models?.User || mongoose.model('User', UserSchema);
