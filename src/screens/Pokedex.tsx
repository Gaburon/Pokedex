import {SafeAreaView, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import PokeContainer from '../components/Pokemons';

export default function Pokedex() {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#7fb3d5'}}>
      <PokeContainer pokemons={[]} loading={false} error={null} />
    </SafeAreaView>
  );
}
