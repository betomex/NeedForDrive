import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import locationReducer from "./locationReducer";
import carReducer from "./carReducer";
import chequeReducer from "./chequeReducer";

let rootReducer = combineReducers({
  orderPageLocation: locationReducer,
  orderPageCar: carReducer,
  cheque: chequeReducer
});

let store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;