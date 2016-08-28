/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDBq1IqZJI8Ozb0yI1-CcPH3XeKqdB21l0",
  authDomain: "react-native-firebase-mo-c0829.firebaseapp.com",
  databaseURL: "https://react-native-firebase-mo-c0829.firebaseio.com",
  storageBucket: "react-native-firebase-mo-c0829.appspot.com",
};


class ReactNativeFirebaseMotto extends Component {
  constructor(props) {
    super(props);
    const firebaseApp = firebase.initializeApp(firebaseConfig);
    this.itemsRef = firebaseApp.child('items');
    firebaseApp.set({
      title: "Hello World!",
      author: "Simon",
      location: {
        city: "Muenster",
        state: "Germany",
        zip: 48155
      }
    });
    this.state = {};
  }
  addMotto() {
    console.log('fire');
  }
  render() {
    return (
      <Text onPress={addMotto} />
    );
  }
}


AppRegistry.registerComponent('ReactNativeFirebaseMotto', () => ReactNativeFirebaseMotto);
