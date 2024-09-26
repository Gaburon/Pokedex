export interface Pokemon {
  id: number;
  name: string;
  order: number;
  image: string;
  type: string;
}

export interface PokemonCardContainerProps {
  pokemon: Pokemon;
}

export interface PokemonCardComponentProps {
  pokemon: Pokemon & {
    backgroundStyle: {backgroundColor: string};
  };
  goToPokemon: () => void;
}

export interface NavigationProps {
  navigate: (route: string, params?: {id: number}) => void;
}
