import PokemonCardComponent from './PokemonCard';
import {PokemonCardContainerProps} from './typings/index.td';
import usePokemonCard from './UsePokemonCard';

const PokemonCardContainer = (props: PokemonCardContainerProps) => {
  const {pokemon, goToPokemon} = usePokemonCard(props);

  return <PokemonCardComponent pokemon={pokemon} goToPokemon={goToPokemon} />;
};

export default PokemonCardContainer;
