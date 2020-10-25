export const REQUEST_LIST_DATA = 'REQUEST_LIST_DATA';
export const RECEIVE_LIST_DATA = 'RECEIVE_LIST_DATA';

export const requestListData = () => ({ type: REQUEST_LIST_DATA });
export const receiveListData = (data) => ({
  type: RECEIVE_LIST_DATA,
  payload: data,
});
