import React from 'react';
import ReactNative from 'react-native';
import styles from './toolBarStyles';
const { View, Text } = ReactNative;

const ToolBar = () => (
  <View style={styles.toolBarContainer}>
    <Text style={styles.toolBarText}>Motto</Text>
  </View>
);

export default ToolBar; 