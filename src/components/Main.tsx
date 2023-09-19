import {AnonymousView, UserView} from '@/components';
import {FIREBASE_DB} from '@/config/firebase';
import {useAuth, usePokemons} from '@/hooks';
import {theme} from '@/theme';
import {RootState} from '@/types';
// import {collection, getDocs} from 'firebase/firestore';
import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import {collection, getDocs} from 'firebase/firestore/lite';

export const Main = () => {
  const {user} = useSelector((state: RootState) => state.user);

  useAuth();
  usePokemons();

  const idk = async () => {
    let favsRef = collection(FIREBASE_DB, 'favs');
    const snapshot = await getDocs(favsRef);
    const favsList = snapshot.docs.map(doc => doc.data());
    console.log(favsList);
  };

  const create = async () => {
    // const docRef = doc(FIREBASE_DB, `favs/${user?.uid}`);
    // const query = await getDoc(docRef);
    // console.log(query);
    // if (query.exists()) {
    //   const previous = query.data();
    //   await setDoc(docRef, {...previous, lol: 30});
    //   console.log('agregado!');
    // } else {
    //   await setDoc(docRef, {jajaa: '300'});
    //   console.log('creado!');
    // }
  };

  return (
    <View style={styles.container}>
      {/* // ?: 1 */}
      <Text style={styles.title}>PokeFav</Text>
      {user ? <UserView /> : <AnonymousView />}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: theme.fontSizes.huge,
    // ?: 1
    fontWeight: '900' || theme.fontWeights.bold,
    textAlign: 'center',
    marginBottom: theme.spaces.medium,
  },
  container: {
    padding: theme.spaces.small,
    paddingBottom: theme.spaces.safeBottom,
    backgroundColor: theme.colors.blue,
    // alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100%',
  },
});

/*


      {user ? (
        <>
          <Button title="Log out" onPress={logOut} />
          <Text>Hola {user.email}</Text>
          <FlatList
            data={pokemons}
            ItemSeparatorComponent={Separator}
            renderItem={({item: poke}: {item: Pokemon}) => (
              <ListItem name={poke.name} url={poke.url} />
            )}
          />
        </>
      ) : (
        <>
          <Button
            title="Create user"
            onPress={async () => {
              try {
                const res = await fetch('http://10.0.2.2:3001/create', {
                  method: 'post',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    email: 'lefedeok@gmail.com',
                    password: '123456',
                  }),
                });
                const data = await res.json();
                if (data.status === 400) throw new Error(data.message);
                console.log(data.message);
              } catch (err: any) {
                console.log(err.message);
              }
            }}
          />
          {/* <Button
            title="Create user"
            onPress={async () => {
              try {
                const res = await createUserWithEmailAndPassword(
                  FIREBASE_AUTH,
                  'lefedeok@gmail.com',
                  '123456',
                );

                console.log(res);
              } catch (err) {
                console.log(err);
              }
            }}
          /> }

          <Button
            title="Log in"
            onPress={async () => {
              try {
                const res = await signInWithEmailAndPassword(
                  FIREBASE_AUTH,
                  'lefedeok@gmail.com',
                  '123456',
                );

                console.log(res);
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </>
      )}
      {user ? <Text>AUTENTICADO PA!</Text> : <Text>NONO</Text>}
      */
