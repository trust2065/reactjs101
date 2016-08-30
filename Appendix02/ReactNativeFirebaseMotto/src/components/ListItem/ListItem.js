import React from 'react';
import ReactNative from 'react-native';
const { View, Text } = ReactNative;

const ListItem = (props) => {
  console.log(props);
  return (
  <View>
    <Text>{props.item.get('title')}</Text>
  </View>
  )
};

export default ListItem;