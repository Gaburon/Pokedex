export interface getPokemonsDetailsProps {
  url: string;
}

export type PokemonDetails = {
  id: number;
  name: string;
  image: string;
  type: string[];
  order: number;
};

export type Pokecontainer = {
  pokemons: PokemonDetails[];
  loading: boolean;
  error: string | null;
};

export interface PokemonComponentProps {
  pokemons: PokemonDetails[];
  loading: boolean;
  error: string | null;
}
