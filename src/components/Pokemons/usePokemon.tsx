import {useEffect, useState} from 'react';
import {fetchPokemon} from './utils/fetch';
import {Pokecontainer, PokemonDetails} from './typings/index.td';

export const usePokemon = (props: Pokecontainer) => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPokemons = async () => {
      try {
        const fetchedPokemons = await fetchPokemon();
        setPokemons(fetchedPokemons);
      } catch (err) {
        setError('Failed to fetch Pokémon data');
      } finally {
        setLoading(false);
      }
    };

    loadPokemons();
  }, []);

  return {pokemons, loading, error};
};

export default usePokemon;
