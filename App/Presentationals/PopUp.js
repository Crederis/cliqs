import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import { WHITE } from '../Visuality/colors';
import Button from './Button';

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    height: Dimensions.get('screen').width * 0.5,
    width: Dimensions.get('screen').width * 0.85,
    padding: 12,
    borderRadius: 8,
    justifyContent: 'space-between',
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function PopUp({ isVisible, message, close, style }) {
  return (
    <Modal isVisible={isVisible} style={styles.modal} onBackdropPress={close}>
      <View style={[style, styles.container]}>
        <Text>{message}</Text>
        <Button secondary text={'Close'} onPress={close} />
      </View>
    </Modal>
  );
}

export default PopUp;
