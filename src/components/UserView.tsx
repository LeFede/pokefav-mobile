import {fetchFavs, logOutUser, resetFav, setFav} from '@/redux';
import {store} from '@/redux/store';
import {AppDispatch} from '@/types';
import {useEffect, useState} from 'react';
import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ListItem} from './ListItem';
import {theme} from '@/theme';

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
  const [showMenu, setShowMenu] = useState(false);

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
      <View style={[styles.menu, showMenu ? styles.show : styles.hide]}>
        <Button
          title="Log out"
          onPress={() => {
            dispatch(logOutUser());
          }}
        />
        <Text>Hola {user?.email}</Text>
      </View>

      <View style={styles.button}>
        <Button
          title="MOBILE"
          onPress={() => {
            setShowMenu(!showMenu);
          }}
        />
      </View>

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

const styles = StyleSheet.create({
  button: {
    // display: 'none',
    position: 'absolute',
    right: 0,
    bottom: 150,
    margin: 30,
    zIndex: 1,
  },
  hide: {
    left: '-150%',
  },
  show: {
    left: 0,
  },
  menu: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: theme.colors.blue,
    height: '100%',
    padding: 30,
  },
});
