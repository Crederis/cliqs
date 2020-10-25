import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  FlatList,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
} from 'react-native';
import { List } from '../Presentationals';
import { requestListData } from '../action/Lists';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BLACK_TEXT, BLUE_BACKGROUND, WHITE } from '../Visuality/colors';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: BLUE_BACKGROUND,
    flex: 1,
  },
  title: {
    marginVertical: 20,
  },
  titleText: {
    fontSize: 32,
    color: WHITE,
  },
  addData: {
    marginVertical: 12,
  },
});

function Home(props) {
  // props.requestListData()
  const { data } = props;
  const [listData, setListData] = useState(null);
  const [shownData, setShownData] = useState(5);
  const [limit, setLimit] = useState(0);
  const [addData, setAddData] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(false);

  const fetchData = () => {
    props.requestListData();
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
    if (data !== null) {
      setListData(data);
    }
  }, [data]);

  const wait = (timeout) => {
    return new Promise((resolve) => {
      setTimeout(resolve, timeout);
    });
  };

  const onRefresh = React.useCallback(() => {
    setRefreshStatus(true);
    fetchData();

    wait(1500).then(setRefreshStatus(false));
  });

  const resetLimit = () => {
    const newLimit = limit + 1;
    const newShownData = shownData + 1;
    setLimit(newLimit);
    setShownData(newShownData);
    if (newLimit === 2) {
      setAddData(false);
    }
  };

  const bringToTop = (serial) => {
    const data = listData;
    const item = data[serial - 1];
    const newData = data.splice(serial - 1, 1);
    const newListData = data.unshift(item);
    setListData(newData);
    console.tron.log('newData', newData);
  };

  const renderItem = ({ item, i }) => {
    return (
      <List
        serial={i + 1}
        text={item.joke}
        shownData={shownData}
        bringToTop={bringToTop}
      />
    );
  };

  if (listData) {
    console.tron.log('listData', listData);
    return (
      // <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.title}>
          <Text style={styles.titleText}>Who's on top?</Text>
        </View>
        <ScrollView>
          <RefreshControl refreshing={refreshStatus} onRefresh={onRefresh} />
          <FlatList
            data={listData}
            extraData={listData}
            keyExtractor={(index) => index.toString()}
            renderItem={({ item, index }) => renderItem({ item, i: index })}
          />
        </ScrollView>
        {addData ? (
          <TouchableOpacity style={styles.addData} onPress={() => resetLimit()}>
            <Text style={{ color: BLACK_TEXT, fontSize: 16 }}>
              + Add more data
            </Text>
          </TouchableOpacity>
        ) : (
            <View />
          )}
      </SafeAreaView>
    );
  }
  return null;
}

const mapStateToProps = (state) => ({
  data: state.listData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestListData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
