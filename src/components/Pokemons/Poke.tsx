import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import {PokemonComponentProps} from './typings/index.td';
import PokemonCard from '../PokemonCard/PokemonCard';

const PokemonComponent: React.FC<PokemonComponentProps> = ({
  pokemons,
  loading,
  error,
  loadPokemons,
  isLoadingMore,
}) => {
  const loadMorePokemons = () => {
    if (!isLoadingMore) {
      loadPokemons();
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <FlatList
      data={pokemons}
      numColumns={2}
      keyExtractor={pokemon => String(pokemon.id)}
      renderItem={({item: pokemon}) => <PokemonCard pokemon={pokemon} />}
      contentContainerStyle={styles.flatListContentContainer}
      showsVerticalScrollIndicator={false}
      onEndReached={loadMorePokemons}
      onEndReachedThreshold={0.5}
      ListFooterComponent={
        isLoadingMore ? (
          <ActivityIndicator
            style={{marginTop: 20, marginBottom: 40}}
            color="#0000ff"
          />
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingVertical: 10,
  },
});

export default PokemonComponent;
