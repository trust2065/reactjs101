import React from 'react';
import ReactNative from 'react-native';
const { View, Text, Modal, TextInput, TouchableHighlight } = ReactNative;  

const ActionButton = (props) => (
  <View>
    <TouchableHighlight>
      <Text>{props.title}</Text>
    </TouchableHighlight>
  </View>
);

export default ActionButton;
