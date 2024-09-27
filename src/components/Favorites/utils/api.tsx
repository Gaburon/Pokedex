import AsyncStorage from '@react-native-async-storage/async-storage';
import {FAVORITE_STORAGE} from './constant';

export async function getPokemonsFavoriteApi() {
  try {
    const response = await AsyncStorage.getItem(FAVORITE_STORAGE);
    return response ? JSON.parse(response) : [];
  } catch (error) {
    console.error(error);
  }
}

export async function addPokemonFavoriteApi(id: number) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    favorites.push(id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(favorites));
  } catch (error) {
    console.error(error);
  }
}

export const isPokemonFavoriteApi = async (id: number) => {
  try {
    const favorites = await getPokemonsFavoriteApi();
    return favorites.includes(id);
  } catch (ex) {
    throw ex;
  }
};

export async function removePokemonFavoriteApi(id: number) {
  try {
    const favorites = await getPokemonsFavoriteApi();
    const newFavorites = favorites.filter((pokeId: number) => pokeId !== id);
    await AsyncStorage.setItem(FAVORITE_STORAGE, JSON.stringify(newFavorites));
  } catch (error) {
    console.log(error);
  }
}
