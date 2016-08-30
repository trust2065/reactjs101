import React from 'react';
import ReactNative from 'react-native';
import { Provider } from 'react-redux'; 
import ToolBar from '../ToolBar';
import MottoListContainer from '../../containers/MottoListContainer';
import ListItem from '../ListItem';
import ActionButton from '../ActionButton';
import * as firebase from 'firebase';
import { firebaseConfig } from '../../constants/config';
import store from '../../store';
const { View, Text } = ReactNative;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
// Create a reference with .ref() instead of new Firebase(url)
const rootRef = firebaseApp.database().ref();
const itemsRef = rootRef.child('items');

const Main = () => (
  <Provider store={store}>
    <View>
      <ToolBar title="Grocery List" />
      <MottoListContainer itemsRef={itemsRef} />
      <ActionButton title="Add" />
    </View>
  </Provider>
);

export default Main; 