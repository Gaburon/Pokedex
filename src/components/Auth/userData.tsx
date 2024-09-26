import {View, Text, StyleSheet, Button, Image} from 'react-native';
import React from 'react';
import useAuth from '../../hooks/useAuth';

export default function userData() {
  const {auth, logout} = useAuth();

  function ItemMenu(props) {
    const {title, text} = props;

    return (
      <View style={styles.itemMenu}>
        <Text style={styles.itemMenuTitle}>{title}:</Text>
        <Text>{text}</Text>
      </View>
    );
  }
  return (
    <View style={styles.content}>
      <View style={styles.titleBlock}>
        <Text style={styles.title}>Bienvenido, {auth.userName}</Text>
        <Image
          style={styles.image}
          source={require('../../assets/Mimikyu.png')}></Image>
      </View>

      <View style={styles.dataContent}>
        <ItemMenu title="Nombre" text={`${auth.firstName} ${auth.lastName}`} />
        <ItemMenu title="Username" text={auth.userName} />
        <ItemMenu title="Email" text={auth.email} />
        <ItemMenu title="Total Favoritos" text={`0 pokemons`} />
      </View>

      <Button title="Desconectarse" onPress={logout} style={styles.btnLogoun} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginHorizontal: 20,

    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
  },
  titleBlock: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#333',
  },

  image: {
    width: 100,
    marginTop: 10,
    height: 100,
    borderRadius: 50,
    alignSelf: 'center',
    backgroundColor: '#f5f5f5',
    shadowColor: '#000',
    shadowOpacity: 0.25,
  },
  dataContent: {
    paddingVertical: 20,
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: 'row',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#CFCFCF',
    alignItems: 'center',
  },
  itemMenuTitle: {
    fontWeight: 'bold',
    paddingRight: 10,
    width: 120,
    color: '#333',
  },
  btnLogoun: {
    paddingTop: 20,
    backgroundColor: '#333',
    borderRadius: 10,
    marginHorizontal: 'auto',
    alignSelf: 'center',
    width: '50%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLogoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
