import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_LIST_DATA, receiveListData } from '../action/Lists';
import { getList } from '../api';

function* getData() {
  try {
    const response = yield call(getList);
    yield put(receiveListData(response.value));
  } catch (e) {
    // yield put(console.log(e));
  }
}

export default function* getListData() {
  yield takeLatest(REQUEST_LIST_DATA, getData);
}
