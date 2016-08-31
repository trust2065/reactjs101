import React from 'react';
import ReactNative from 'react-native';
import styles from './actionButtonStyles';
const { View, Text, Modal, TextInput, TouchableHighlight } = ReactNative;  

const ActionButton = (props) => (
  <View style={styles.buttonContainer}>
    <TouchableHighlight onPress={props.onToggleModal}>
      <Text style={styles.buttonText}>Add Motto</Text>
    </TouchableHighlight>
  </View>
);

export default ActionButton;
