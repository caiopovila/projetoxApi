import mongoose from '../connection';

const userSchema = new mongoose.Schema({
  name: String,
  username: { type: String, require: true },
  password: { type: String, require: true }
});

export const User = mongoose.model('user', userSchema);
