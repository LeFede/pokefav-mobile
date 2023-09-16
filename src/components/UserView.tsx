import {FIREBASE_AUTH} from '@/config/firebase';
import {store} from '@/redux/store';
import {signOut} from 'firebase/auth';
import {Button, FlatList, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {ListItem} from './ListItem';

export interface Pokemon {
  name: string;
  url: string;
}

export type RootState = ReturnType<typeof store.getState>;
const Separator = () => <Text> </Text>;

export const UserView = () => {
  const {user} = useSelector((state: RootState) => state.user);
  const {pokemons} = useSelector((state: RootState) => state.pokemon);

  const logOut = async () => {
    try {
      const res = await signOut(FIREBASE_AUTH);
      console.log('nos vemos pa!');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button title="Log out" onPress={logOut} />
      <Text>Hola {user?.email}</Text>
      <FlatList
        data={pokemons}
        ItemSeparatorComponent={Separator}
        renderItem={({item: poke}: {item: Pokemon}) => (
          <ListItem name={poke.name} url={poke.url} />
        )}
      />
    </>
  );
};
