import PokemonComponent from './Poke';
import {Pokecontainer} from './typings/index.td';
import usePokemon from './usePokemon';

const PokeContainer = (props: Pokecontainer) => {
  const usePokemonResult = usePokemon(props);

  return <PokemonComponent {...props} {...usePokemonResult} />;
};

export default PokeContainer;
