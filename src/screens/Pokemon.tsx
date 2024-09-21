import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {getPokemonsDetailsapi} from '../components/Pokemons/utils/fetch';
import Header from '../components/HeaderPokemons/Header';

export default function Pokemon(props: {
  navigation: any;
  route: {params: {id: number}};
}) {
  const {
    navigation,
    route: {params},
  } = props;
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

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
    </ScrollView>
  );
}
