import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { WHITE } from '../Visuality/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    padding: 8,
    borderRadius: 8,
    marginVertical: 4,
  },
  content: {
    flexDirection: 'row',
    maxWidth: Dimensions.get('screen').width * 0.75,
    padding: 8,
  },
  serial: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    flex: 12,
  },
  icon: {
    marginLeft: 4,
  },
  topText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrow: {
    height: 30,
    width: 20,
  },
});

function List(props) {
  const { serial, text, shownData, bringToTop, onPress } = props;
  const LeftIcon = ({ serial }) => {
    if (serial === 1) {
      return (
        <View style={styles.icon}>
          <Text style={styles.topText}>Top</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => bringToTop(serial)}>
          <Image
            source={require('../assets/arrow_up.png')}
            style={styles.arrow}
          />
        </TouchableOpacity>
      );
    }
  };

  if (serial <= shownData) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content} onPress={() => onPress(text)}>
          <View style={styles.serial}>
            <Text>{serial}</Text>
          </View>
          <View style={styles.text}>
            <Text numberOfLines={2} style={{ textAlign: 'justify' }}>
              {text}
            </Text>
          </View>
        </TouchableOpacity>
        <LeftIcon serial={serial} />
      </View>
    );
  }
  return null;
}

export default List;
