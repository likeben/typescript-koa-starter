import mongoose from 'mongoose';
import { comparePwd, hashPwd } from '../helpers/utils';

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
  deleted: boolean;

  comparePassword: (value: string) => boolean;
};

export type UserModel = mongoose.Model<UserEntity> & {
  findByUsername: (username: string) => UserEntity;
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
    deleted: Boolean,
  },
  {
    collection: 'User',
    timestamps: true,
    // toJSON: { getters: true },
  }
);

userSchema.pre('save', function(next) {
  const user = this as UserEntity;
  if (!user.isModified('password')) {
    return next();
  }
  user.password = hashPwd(user.password);
  next();
});

userSchema.statics.findByUsername = function(
  this: UserModel,
  username: string
) {
  return this.findOne({ username });
};

userSchema.methods.comparePassword = function(this: UserEntity, value: string) {
  return comparePwd(value, this.password);
};

const User = mongoose.model('User', userSchema) as UserModel;

export default User;
