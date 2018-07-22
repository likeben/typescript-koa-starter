import validator from 'validator';
import * as yup from 'yup';

yup.addMethod(yup.string, 'mobilePhone', function mobilePhone() {
  return this.test({
    name: 'mobilePhone',
    test: (value: string) => validator.isMobilePhone(value, 'zh-CN'),
    message: '${path} must be a valid mobile phone number',
  });
});

declare module 'yup' {
  interface StringSchema {
    mobilePhone(): StringSchema;
  }
}

export const signUp = yup.object().shape({
  username: yup
    .string()
    .min(3)
    .max(20)
    .required(),
  password: yup
    .string()
    .min(6)
    .required(),
  phoneNumber: yup.string().mobilePhone(),
  profile: yup.object().shape({
    name: yup.string(),
    gender: yup.string(),
    location: yup.string(),
    website: yup.string(),
    picture: yup.string(),
  }),
});
