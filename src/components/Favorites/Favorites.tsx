import Icon from 'react-native-vector-icons/Ionicons';
import React, {useEffect, useState} from 'react';
import {
  addPokemonFavoriteApi,
  isPokemonFavoriteApi,
  removePokemonFavoriteApi,
} from './utils/api';

export default function Favorite(props: {id: number}) {
  const {id} = props;

  const [isFavorite, setIsFavorite] = useState<boolean | undefined>(undefined);
  const [reloadChkeck, setReloadChkeck] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await isPokemonFavoriteApi(id);
        setIsFavorite(response);
      } catch (error) {
        setIsFavorite(false);
      }
    })();
  }, [id, reloadChkeck]);

  const onReloadFavorite = () => {
    setReloadChkeck(prev => !prev);
  };

  const addFavorite = async () => {
    try {
      await addPokemonFavoriteApi(id);
      onReloadFavorite();
    } catch (error) {
      console.error(error);
    }
  };

  const removeFavorite = async () => {
    try {
      await removePokemonFavoriteApi(id);
      onReloadFavorite();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Icon
      name={isFavorite ? 'heart-sharp' : 'heart-outline'}
      color="#fff"
      size={30}
      style={{marginTop: 10}}
      onPress={isFavorite ? removeFavorite : addFavorite}
    />
  );
}
