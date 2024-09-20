import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PokedexScreen from '../screens/Pokedex';
import PokemonScreen from '../screens/Pokemon';

const Stack = createNativeStackNavigator();

export default function PokedexNavigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pokemom"
        component={PokedexScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PokedexChild"
        component={PokemonScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
