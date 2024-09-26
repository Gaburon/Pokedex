import {View} from 'react-native';
import React from 'react';
import LoginForm from '../components/Auth/loginForm';
import UserData from '../components/Auth/userData';
import useAuth from '../hooks/useAuth';

export default function Account() {
  const {auth} = useAuth();

  return (
    <View
      style={{backgroundColor: '#2271b3', flex: 1, justifyContent: 'center'}}>
      {auth ? <UserData /> : <LoginForm />}
    </View>
  );
}
