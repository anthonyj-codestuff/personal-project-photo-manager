import { createStore, applyMiddleware, compose } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import generalReducer from './redux/generalReducer';

// devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//middlewares
const middlewares = composeEnhancers(applyMiddleware(promiseMiddleware()));

// store with reducers and middlewares
const store = createStore(generalReducer, middlewares);

export default store;