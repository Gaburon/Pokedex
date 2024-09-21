import {API_HOST} from './constants';
import {getPokemonsDetailsProps, PokemonDetails} from '../typings/index.td';

export const fetchPokemon = async (
  offset: number,
): Promise<PokemonDetails[]> => {
  try {
    const response = await pokemonsApi(offset);
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

const pokemonsApi = async (offset: number) => {
  try {
    const response = await fetch(
      `${API_HOST}/pokemon?limit=20&offset=${offset}`,
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error);
  }
};

export async function getPokemonsDetailsapi(id: number) {
  try {
    const response = await fetch(`${API_HOST}/pokemon/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}
