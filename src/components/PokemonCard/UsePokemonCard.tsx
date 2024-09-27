import {useNavigation} from '@react-navigation/native';
import getColorByPokemonType from './utils/GetColorType';
import {PokemonCardContainerProps, NavigationProps} from './typings/index.td';

const usePokemonCard = (props: PokemonCardContainerProps) => {
  const {pokemon} = props;
  const navigation = useNavigation<NavigationProps>();

  const pokemonColor = getColorByPokemonType(pokemon.type);
  const goToPokemon = () => {
    navigation.navigate('Pokemon', {id: pokemon.id});
  };

  return {
    pokemon: {
      ...pokemon,
      backgroundStyle: {backgroundColor: pokemonColor},
    },
    goToPokemon,
  };
};

export default usePokemonCard;
