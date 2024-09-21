import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import getColorByPokemonType from './utils/GetColorType';
import {useNavigation} from '@react-navigation/native';
import {NavigationProps} from './typings/index.td';

export default function PokemonCard(props: any) {
  const {pokemon} = props;

  const pokemonColor = getColorByPokemonType(pokemon.type);
  const backgroundStyle = {backgroundColor: pokemonColor, ...styles.background};

  const navigation = useNavigation<NavigationProps>();

  const goToPokemon = () => {
    console.log(`pokemon: ${pokemon.id}`);
    navigation.navigate('Pokemon', {id: pokemon.id});
  };

  return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <SafeAreaView style={styles.card}>
        <View style={styles.spacing}>
          <View style={backgroundStyle}>
            <Text style={styles.number}>
              #{`${pokemon.order}`.padStart(3, '0')}
            </Text>
            <Text style={styles.name}>{pokemon.name}</Text>
            <Image source={{uri: pokemon.image}} style={styles.image} />
          </View>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    height: 130,
  },
  spacing: {
    flex: 1,
    padding: 5,
  },
  background: {
    flex: 1,
    borderRadius: 15,
    padding: 10,
  },
  number: {
    position: 'absolute',
    right: 10,
    top: 10,
    color: '#fff',
    fontSize: 11,
  },
  name: {
    textTransform: 'capitalize',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
    paddingTop: 10,
  },
  image: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 90,
    height: 90,
  },
});
