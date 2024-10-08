import React from 'react';
import {Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import AccountScreen from '../screens/Account';
import FavoriteScreen from '../screens/Favorite';
import PokedexNavigation from './PokedexNavigator';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Favorites"
        component={FavoriteScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          tabBarLabel: 'Favoritos',
          tabBarIcon: ({color, size}) => (
            <Icon name="heart-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Pokedex"
        component={PokedexNavigation}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: () => (
            <Image
              source={require('../assets/pokeball.png')}
              style={{width: 75, height: 75, top: -15}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({color, size}) => (
            <Icon name="person-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
