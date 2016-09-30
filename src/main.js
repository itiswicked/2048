import { createStore } from 'redux';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import './styles.scss';
import rootReducer from './reducers/index';
import TwentyFourtyEight from './containers/TwentyFourtyEight';

let store = createStore(rootReducer, window.devToolsExtension && window.devToolsExtension());

render(
  <Provider store={store}>
    <TwentyFourtyEight />
  </Provider>,
  document.getElementById('app')
);
