import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
  // make a connection between the clerk user and database user
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  photo: { type: String, required: true },
});

const User = models.User || model('User', UserSchema);

export default User;
