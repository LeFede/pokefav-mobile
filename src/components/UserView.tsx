import {fetchFavs, logOutUser, resetFav, setFav} from '@/redux';
import {store} from '@/redux/store';
import {AppDispatch} from '@/types';
import {useEffect} from 'react';
import {Button, FlatList, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem} from './ListItem';

export interface Pokemon {
  name: string;
  height: number;
  weight: number;
  id: number;
  fav: boolean;
}

export type RootState = ReturnType<typeof store.getState>;
const Separator = () => <Text> </Text>;

export const UserView = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const {pokemons, favs} = useSelector((state: RootState) => state.pokemon);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log(favs);
  }, [favs]);

  useEffect(() => {
    dispatch(resetFav());
    console.log('Fetch favs');
    dispatch(fetchFavs(user?.uid));
  }, []);

  return (
    <>
      <Button
        title="Log out"
        onPress={() => {
          dispatch(logOutUser());
        }}
      />
      <Text>Hola {user?.email}</Text>
      <FlatList
        data={pokemons}
        ItemSeparatorComponent={Separator}
        renderItem={({item: poke}: {item: Pokemon}) => {
          return (
            <ListItem
              {...poke}
              fav={favs.some(fav => fav === poke.id) ? true : false}
            />
          );
        }}
      />
    </>
  );
};
