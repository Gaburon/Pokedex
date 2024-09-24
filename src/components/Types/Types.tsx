import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import getColorByPokemonType from '../PokemonCard/utils/GetColorType';

export default function Types(
  props: Readonly<{
    types: {type: {name: string}}[];
  }>,
): React.ReactElement {
  const {types} = props;

  const color = (type: string) => getColorByPokemonType(type);
  return (
    <View style={styles.content}>
      {types.map(item => (
        <View
          key={item.type.name}
          style={{backgroundColor: color(item.type.name), ...styles.pill}}>
          <Text style={styles.text}>{item.type.name}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    marginTop: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pill: {
    paddingHorizontal: 30,
    paddingVertical: 5,
    borderRadius: 20,
    marginHorizontal: 10,
  },
  text: {
    textTransform: 'capitalize',
  },
});
