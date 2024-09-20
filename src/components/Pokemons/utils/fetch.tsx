import {API_HOST} from './constants';
import {getPokemonsDetailsProps, PokemonDetails} from '../typings/index.td';

export const fetchPokemon = async (): Promise<PokemonDetails[]> => {
  try {
    const response = await pokemonsApi();
    const pokemonsArray: PokemonDetails[] = [];

    for (const pokemon of response.results) {
      const pokemonDetails = await getPokemonsDetailsByapi({
        url: pokemon.url,
      });

      pokemonsArray.push({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonDetails.types[0].type.name,
        order: pokemonDetails.order,
        image: pokemonDetails.sprites.other['official-artwork'].front_default,
      });
    }

    return pokemonsArray;
  } catch (error) {
    console.error(error);
    return [];
  }
};

async function getPokemonsDetailsByapi(props: getPokemonsDetailsProps) {
  try {
    const response = await fetch(props.url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

const pokemonsApi = async () => {
  try {
    const response = await fetch(`${API_HOST}/pokemon?limit=20&offset=0`);
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};
