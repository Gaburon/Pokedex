import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
} from 'react-native';
import {PokemonComponentProps} from './typings/index.td';
import PokemonCardContainer from '../PokemonCard';

const PokemonComponent: React.FC<PokemonComponentProps> = ({
  pokemons,
  loading,
  error,
  loadPokemons,
  isLoadingMore,
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleClearSearch,
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
    <View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Pokémon"
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
        <View style={styles.buttonContainer}>
          <Button title="Search" onPress={handleSearch} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Clear" onPress={handleClearSearch} />
        </View>
      </View>

      <FlatList
        data={pokemons}
        numColumns={2}
        keyExtractor={pokemon => String(pokemon.id)}
        renderItem={({item: pokemon}) => (
          <PokemonCardContainer pokemon={pokemon} />
        )}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMorePokemons}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={
        //   isLoadingMore ? (
        //     <ActivityIndicator
        //       style={{marginTop: 20, marginBottom: 40}}
        //       color="#0000ff"
        //     />
        //   ) : null
        // }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
  },
  searchInput: {
    flex: 1,
    borderColor: '#000',
    backgroundColor: '#fff',
    borderWidth: 1,
    marginRight: 10,
    padding: 5,
  },
  buttonContainer: {
    width: 80,
    marginRight: 10,
  },
});

export default PokemonComponent;
