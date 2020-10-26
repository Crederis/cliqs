import reducers from '.';
import { RECEIVE_LIST_DATA } from '../action/Lists'

export default (state = {}, { type, payload }) => {
  switch (type) {
    case RECEIVE_LIST_DATA:
      return payload;
    default:
      return state;
  }
};
