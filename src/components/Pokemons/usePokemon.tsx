import {useCallback, useEffect, useState} from 'react';
import {fetchPokemon} from './utils/fetch';
import {Pokecontainer, PokemonDetails} from './typings/index.td';

export const usePokemon = (props: Pokecontainer) => {
  const [pokemons, setPokemons] = useState<PokemonDetails[]>([]);
  const [filteredPokemons, setFilteredPokemons] = useState<PokemonDetails[]>(
    [],
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [offset, setOffset] = useState<number>(0);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadPokemons = useCallback(async () => {
    setIsLoadingMore(true);
    try {
      const fetchedPokemons = await fetchPokemon(offset);
      setPokemons(prevPokemons => [...prevPokemons, ...fetchedPokemons]);
      setOffset(prevOffset => prevOffset + 20);
    } catch (err) {
      setError('Failed to fetch Pokémon data');
    } finally {
      setIsLoadingMore(false);
      setLoading(false);
    }
  }, [offset]);

  useEffect(() => {
    loadPokemons();
  }, []);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    if (searchTerm) {
      const filtered = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredPokemons(filtered);
      console.log('Filtered Pokemons:', filtered);
    }
  };

  const handleClearSearch = () => {
    setFilteredPokemons([]);
    setSearchTerm('');
  };

  return {
    pokemons: filteredPokemons.length > 0 ? filteredPokemons : pokemons,
    loading,
    error,
    loadPokemons,
    isLoadingMore,
    searchTerm,
    setSearchTerm,
    handleSearch,
    handleClearSearch,
  };
};
export default usePokemon;
