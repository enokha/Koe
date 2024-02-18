import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';

const rootReducer = combineReducers({
  user: userReducer,
});

const store = createStore(
  rootReducer,
  // Add any middleware or enhancers here
);

export default store;
