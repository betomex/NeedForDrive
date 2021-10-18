import {applyMiddleware, combineReducers, createStore} from "redux";
import thunkMiddleWare from 'redux-thunk';
import locationReducer from "./locationReducer";
import carReducer from "./carReducer";
import chequeReducer from "./chequeReducer";
import addonReducer from "./addonReducer";

const rootReducer = combineReducers({
  orderPageLocation: locationReducer,
  orderPageCar: carReducer,
  orderPageAddons: addonReducer,
  cheque: chequeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunkMiddleWare));

export default store;