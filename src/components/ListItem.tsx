import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

type ListItemProps = {name: string; url: string};

export const ListItem = (props: ListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.name}</Text>
      <TouchableWithoutFeedback onPress={() => Alert.alert('xd')}>
        <Text style={styles.heart}>♥</Text>
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
  },
});
