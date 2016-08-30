import React from 'react';
import ReactNative from 'react-native';
const { View, Text, Modal, TextInput, TouchableHighlight } = ReactNative;  

const ActionButton = (props) => (
  <View>
    <TouchableHighlight onPress={props.onToggleModal}>
      <Text>Add Motto</Text>
    </TouchableHighlight>
  </View>
);

export default ActionButton;
