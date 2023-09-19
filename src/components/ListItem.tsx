import React from 'react';
import {StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Pokemon} from './UserView';
import {setFav} from '@/redux';
import {AppDispatch, RootState} from '@/types';

export const ListItem = (props: Pokemon & {setFav: any}) => {
  const {user} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{props.name}</Text>
        <Text>id: {props.id}</Text>
        <Text>weight: {props.weight}</Text>
        <Text>height: {props.height}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={() =>
          dispatch(setFav({userId: user?.uid as string, itemId: props}))
        }>
        <Text style={[styles.heart, props.fav && styles.fav]}>
          {props.fav ? '♥' : '😢'}
        </Text>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    backgroundColor: '#FF000033',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
    flexDirection: 'row',
  },
  text: {
    fontSize: 25,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  heart: {
    fontSize: 25,
    opacity: 0.2,
    color: 'white',
  },
  fav: {
    opacity: 1,
  },
});
