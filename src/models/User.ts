import mongoose from 'mongoose';

export type UserEntity = mongoose.Document & {
  username: string;
  password: string;
  phoneNumber: string;
  profile?: {
    name: string;
    email: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
  };
};

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true, index: true },
    password: { type: String, required: true },
    phoneNumber: String,
    profile: {
      name: String,
      email: String,
      gender: String,
      location: String,
      website: String,
      picture: String,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', userSchema);

export default class User extends UserModel {}
