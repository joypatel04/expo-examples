import Expo from 'expo';
import React, { Component } from 'react';
import Store from './src/store/configureStore' 
import { Provider } from 'react-redux';
import App from './src/App';

class Root extends Component {
  render() {
    return (
      <Provider store={Store}>
        <App />
      </Provider>
    );
  }
}

Expo.registerRootComponent(Root);
