import React from 'react';
import ReactDOM from 'react-dom';
import RoutesComp from './routes';

import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './store/reducers';

const createStoreWithMiddleware = createStore(reducers, composeWithDevTools(applyMiddleware(promiseMiddleware, thunk)));


ReactDOM.render(
    <Provider store={createStoreWithMiddleware}>
      <RoutesComp/>
    </Provider>
  
    , document.getElementById('root'));


