import React from 'react';
import ReactNative from 'react-native';
const { View, Text, Modal, TouchableHighlight } = ReactNative;
const InputModal = (props) => (
  <View>
    <Modal
      animationType={"slide"}
      transparent={false}
      visible={props.isModalVisible}
      onRequestClose={() => {alert("Modal has been closed.")}}
      >
     <View style={{marginTop: 22}}>
      <View>
        <Text>Hello World!</Text>
        <TouchableHighlight onPress={props.onToggleModal}>
          <Text>Hide Modal</Text>
        </TouchableHighlight>
      </View>
     </View>
    </Modal>
  </View>
);

export default InputModal;