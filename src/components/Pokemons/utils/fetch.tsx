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
        id: 0,
        name: '',
        image: '',
        type: '',
        order: 0,
      });

      pokemonsArray.push({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonDetails.types[0].type.name,
        order: pokemonDetails.order,
        image: pokemonDetails.sprites.other['home'].front_default,
      });
    }

    return pokemonsArray;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const searchPokemonByName = async (
  offset: number,
  limit: number,
  searchTerm: string,
  append: boolean = false,
  finalResult: PokemonDetails[] = [],
): Promise<PokemonDetails[]> => {
  try {
    const response = await fetch(
      `${API_HOST}/pokemon?offset=${offset}&limit=${limit}`,
    );
    if (!response.ok) {
      throw new Error('Failed to fetch Pokémon');
    }

    const result = await response.json();
    const filteredPokemons = result.results.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    for (const pokemon of filteredPokemons) {
      const pokemonDetails = await getPokemonsDetailsByapi({
        url: pokemon.url,
        id: 0,
        name: '',
        image: '',
        type: '',
        order: 0,
      });

      finalResult.push({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        type: pokemonDetails.types[0].type.name,
        order: pokemonDetails.order,
        image: pokemonDetails.sprites.other['home'].front_default,
      });
    }

    if (finalResult.length < 10 && offset < 1000) {
      return searchPokemonByName(
        offset + limit,
        limit,
        searchTerm,
        append,
        finalResult,
      );
    }

    return append ? finalResult : finalResult.slice();
  } catch (error) {
    console.error('Error searching Pokémon:', error);
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
