import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  GestureResponderEvent,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup';

import {user, userDetails} from '../../utils/userDB';
import useAuth from '../../hooks/useAuth';

export default function LoginForm() {
  const [error, SetError] = useState('');
  const {login} = useAuth();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: ({username, password}) => {
      SetError('');
      if (username === user.username && password === user.password) {
        console.log('Logging in');
        login(userDetails);
      } else {
        SetError('Incorrect credentials');
      }
    },
  });

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/PokeballLogin.png')}
        style={styles.image}></Image>
      <Text style={styles.title}>Pokedex</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        autoCapitalize="none"
        value={formik.values.username}
        onChangeText={text => formik.setFieldValue('username', text)}
      />
      <Text style={styles.error}>{formik.errors.username}</Text>
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        autoCapitalize="none"
        value={formik.values.password}
        onChangeText={text => formik.setFieldValue('password', text)}
      />
      <Text style={styles.error}>{formik.errors.password}</Text>
      <View style={styles.button}>
        <Button
          color={'red'}
          borderRadius={20}
          disabled={!formik.isValid}
          title="Enviar"
          onPress={formik.handleSubmit}
        />
      </View>
      <Text style={styles.errorLogin}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 50,
    marginBottom: 15,
    color: 'black',
  },

  container: {
    marginTop: 70,
    flex: 1,
  },

  input: {
    backgroundColor: 'white',
    height: 50,
    marginRight: 12,
    marginLeft: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
  },

  button: {
    width: 200,
    margin: 12,
    borderRadius: 20,
    color: 'black',
    alignSelf: 'center',
  },

  error: {
    textAlign: 'right',
    marginRight: 13,
    color: 'red',
    fontSize: 15,
  },

  errorLogin: {
    textAlign: 'center',
    color: 'red',
  },

  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 50,
  },
});
