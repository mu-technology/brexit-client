import {createStore, applyMiddleware} from 'redux';
import createLogger from 'redux-logger';
import brexitReducer from './brexit.reducer';

const logger = createLogger();
let store = createStore(brexitReducer, applyMiddleware(logger));
export default store;