import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Home from './App/Containers';

import store from './App/store';

export default () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
