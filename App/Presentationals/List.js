import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
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
    // height: 100,
  },
  content: {
    flexDirection: 'row',
    maxWidth: Dimensions.get('screen').width * 0.75,
    // backgroundColor: 'blue',
    padding: 8,
    // flex: 30,
  },
  serial: {
    justifyContent: 'center',
    flex: 1,
  },
  text: {
    // marginLeft: 2,
    // maxWidth: Dimensions.get('screen').width * 0.6,
    flex: 12,
  },
  icon: {
    marginLeft: 4,
    // flex: 1,
  },
});

function List(props) {
  const { serial, text, shownData, bringToTop } = props;
  const LeftIcon = ({ serial }) => {
    if (serial === 1) {
      return (
        <View style={styles.icon}>
          <Text>Top</Text>
        </View>
      )
    } else {
      return (
        <TouchableOpacity
          style={styles.icon}
          onPress={() => bringToTop(serial)}>
          <Text>Icon</Text>
        </TouchableOpacity>
      );
    }
    // return <Icon name="arrow-up" size={25} />;
  };

  if (serial <= shownData) {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.content}>
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
