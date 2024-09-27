import {Image, SafeAreaView, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {getPokemonsFavoriteApi} from '../components/Favorites/utils/api';
import useAuth from '../hooks/useAuth';
import {useFocusEffect} from '@react-navigation/native';
import {getPokemonsDetailsapi} from '../components/Pokedex/utils/fetch';
import PokemonList from '../components/Favorites/PokemonFavList/pokeListFav';
import {PokemonDetails} from '../components/Pokedex/typings/index.td';

export const Favorite = () => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const {auth} = useAuth();

  useFocusEffect(
    useCallback(() => {
      if (auth) {
        (async () => {
          try {
            const response = await getPokemonsFavoriteApi();

            const pokemonsArray = [];
            for await (const id of response) {
              const pokemonDetails = await getPokemonsDetailsapi(id);

              pokemonsArray.push({
                id: pokemonDetails.id,
                name: pokemonDetails.name,
                type: pokemonDetails.types[0].type.name,
                order: pokemonDetails.order,
                image: pokemonDetails.sprites.other['home'].front_default,
              });
            }

            setPokemons([...pokemons, ...pokemonsArray]);
          } catch (error) {
            console.error(error);
          }
        })();
      }
    }, [auth]),
  );

  return !auth ? (
    <View style={{alignItems: 'center'}}>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>No estás logueado</Text>
      <Image
        source={require('../assets/SadPikachu.png')}
        style={{marginTop: 70, alignSelf: 'center', height: 500, width: 500}}
      />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#7fb3d5'}}>
      <PokemonList pokemons={pokemons}></PokemonList>
    </View>
  );
};

export default Favorite;
