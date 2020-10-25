import { fork } from 'redux-saga/effects'
import getListData from './ListData'

export function* rootSaga() {
  yield fork(getListData);
}
