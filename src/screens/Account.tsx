import {View} from 'react-native';
import React from 'react';
import LoginForm from '../components/Auth/loginForm';
import UserData from '../components/Auth/userData';

export default function Account() {
  const auth = null;

  return <View>{auth ? <UserData /> : <LoginForm />}</View>;
}
