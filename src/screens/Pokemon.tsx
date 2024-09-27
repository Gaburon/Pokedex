import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {getPokemonsDetailsapi} from '../components/Pokedex/utils/fetch';
import Header from '../components/HeaderPokemons/Header';
import Types from '../components/Types/Types';
import Stats from '../components/Stats/Stats';
import Icon from 'react-native-vector-icons/Ionicons';
import Favorite from '../components/Favorites/Favorites';
import useAuth from '../hooks/useAuth';

export default function Pokemon(props: any) {
  const {
    navigation,
    route: {params},
  } = props;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);
  const {auth} = useAuth();

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (auth ? <Favorite id={pokemon?.id} /> : null),
      headerLeft: () => (
        <Icon
          name="arrow-back-outline"
          color="#fff"
          size={30}
          style={{marginTop: 10}}
          onPress={navigation.goBack}
        />
      ),
    });
  }, [navigation, params, pokemon]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getPokemonsDetailsapi(params.id);
        setPokemon(response);
      } catch (error) {
        navigation.goBack();
      }
    })();
  }, [params]);

  if (!pokemon) return null;

  return (
    <ScrollView>
      <Header
        name={pokemon.name}
        order={pokemon.order}
        image={pokemon.sprites.other['official-artwork'].front_default}
        type={pokemon.types[0].type.name}
      />
      <Types types={pokemon.types}></Types>
      <Stats stats={pokemon.stats}></Stats>
    </ScrollView>
  );
}
