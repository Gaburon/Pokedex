import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import PokemonCardContainer from '../../PokemonCard';

export default function PokemonList(props) {
  const {pokemons} = props;

  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      keyExtractor={pokemon => String(pokemon.id)}
      renderItem={({item}) => <PokemonCardContainer pokemon={item} />}
      contentContainerStyle={styles.flatListContentContainer}
      ListFooterComponent={() => <View style={{height: 100}} />}
    />
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 5,
  },
});
