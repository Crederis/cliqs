import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  RefreshControl,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { Button, List, PopPup } from '../Presentationals';
import { requestListData } from '../redux/action/Lists';
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
  const { data } = props;
  const initialShownData = 5;
  const maxAddData = 2;
  const [listData, setListData] = useState(null);
  const [shownData, setShownData] = useState(initialShownData);
  const [limit, setLimit] = useState(maxAddData);
  const [addData, setAddData] = useState(true);
  const [refreshStatus, setRefreshStatus] = useState(false);
  const [popUpMessage, setPopUpMessage] = useState(null);
  const [popUpVisibility, setPopUpVisibility] = useState(false);

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
    setShownData(initialShownData);
    setLimit(maxAddData);
    setAddData(true);

    wait(3000).then(setRefreshStatus(false));
  });

  const resetLimit = () => {
    const newLimit = limit - 1;
    const newShownData = shownData + 1;
    setLimit(newLimit);
    setShownData(newShownData);
    if (newLimit === 0) {
      setAddData(false);
    }
  };

  const bringToTop = (serial) => {
    const data = listData;
    const item = data[serial - 1];
    const newData = data.filter((object) => {
      if (object.id !== item.id) {
        return object;
      }
    });
    newData.unshift(item);
    setListData(newData);
  };

  const renderItem = ({ item, i }) => {
    return (
      <List
        serial={i + 1}
        text={item.joke}
        shownData={shownData}
        bringToTop={bringToTop}
        onPress={(text) => openModal(text)}
      />
    );
  };

  const openModal = (message) => {
    setPopUpMessage(message);
    setPopUpVisibility(true);
  };

  const closeModal = () => {
    setPopUpVisibility(false);
  };

  if (listData) {
    return (
      <SafeAreaView style={styles.container}>
        <PopPup
          isVisible={popUpVisibility}
          message={popUpMessage}
          close={() => closeModal()}
        />
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
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color: BLACK_TEXT, fontSize: 14 }}>
              Swipe to refresh
          </Text>
          </View>
          {addData ? (
            <Button text={'Show more data'} onPress={() => resetLimit()} style={{ marginTop: 12, marginHorizontal: 12 }} />
          ) : (
              <View />
            )}
        </ScrollView>
      </SafeAreaView>
    );
  }
  return (
    <View style={[styles.container, { justifyContent: 'center' }]}>
      <ActivityIndicator size="large" color={WHITE} animating={true} />
    </View>
  );
}

const mapStateToProps = (state) => ({
  data: state.listData,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ requestListData }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);
