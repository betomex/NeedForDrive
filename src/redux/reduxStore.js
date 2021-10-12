import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import locationReducer from "./locationReducer";

let rootReducer = combineReducers({
  orderPageLocation: locationReducer,
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;