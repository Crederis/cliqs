import React from 'react';
import { TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import { GRAY, WHITE, DARK_BLUE, BLUE_BACKGROUND, BUTTON_WHITE } from '../Visuality/colors';

function Button({ text, style, onPress, secondary }) {
  const styles = StyleSheet.create({
    container: {
      borderRadius: 8,
      backgroundColor: secondary ? BLUE_BACKGROUND : BUTTON_WHITE,
      height: 50,
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: secondary ? BLUE_BACKGROUND : GRAY,
      padding: 8,
    },
    text: {
      fontSize: 16,
      color: secondary ? WHITE : DARK_BLUE,
      fontWeight: 'bold',
    },
  });

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
}

export default Button;
