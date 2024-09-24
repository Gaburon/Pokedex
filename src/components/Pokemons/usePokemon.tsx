import {useCallback, useEffect, useState, useRef} from 'react';
import {fetchPokemon, searchPokemonByName} from './utils/fetch';
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
  const [searchOffset, setSearchOffset] = useState<number>(0);
  const [isSearching, setIsSearching] = useState<boolean>(false);

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

  const handleSearch = useCallback(async () => {
    if (searchTerm) {
      setLoading(true);
      setIsSearching(true);
      setSearchOffset(0);
      const result = await searchPokemonByName(0, 20, searchTerm);
      setFilteredPokemons(result);
      setLoading(false);
    }
  }, [searchTerm]);

  const loadMoreSearchResults = useCallback(async () => {
    if (isSearching && !isLoadingMore) {
      setIsLoadingMore(true);
      const result = await searchPokemonByName(
        searchOffset,
        20,
        searchTerm,
        true,
      );
      setFilteredPokemons(prev => [...prev, ...result]);
      setSearchOffset(prevOffset => prevOffset + 20);
      setIsLoadingMore(false);
    }
  }, [isSearching, searchOffset, searchTerm, isLoadingMore]);

  const handleClearSearch = () => {
    setFilteredPokemons([]);
    setSearchTerm('');
    setIsSearching(false);
    setSearchOffset(0);
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
    loadMoreSearchResults,
  };
};
export default usePokemon;
