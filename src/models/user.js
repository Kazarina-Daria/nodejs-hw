import mongoose from 'mongoose';
import { model } from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, minlength: 8, required: true },
  },
  { timestamps: true },
);

userSchema.pre('save', async function () {
  if (!this.username) {
    this.username = this.email;
  }
});

userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

export const User = model('User', userSchema);
