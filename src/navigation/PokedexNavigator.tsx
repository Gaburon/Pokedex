import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PokedexScreen from '../screens/Pokedex';
import PokemonScreen from '../screens/Pokemon';
import {ImageBackground} from 'react-native';

const Stack = createNativeStackNavigator();

export default function PokedexNavigation(): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PokedexHome"
        component={PokedexScreen}
        options={{
          headerStyle: {backgroundColor: '#2980b9'},
          headerShown: true,
          headerTintColor: 'black',
          headerTitleAlign: 'center',
          title: 'Pokedex',
        }}
      />
      <Stack.Screen
        name="Pokemon"
        component={PokemonScreen}
        options={{title: '', headerTransparent: true}}
      />
    </Stack.Navigator>
  );
}
