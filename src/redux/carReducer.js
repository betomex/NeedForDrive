import {carAPI} from "../api/api";
import {carActions} from "./actions/carActions";

const initialState = {
  cars: []
};

const carReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CARS/SET_CARS": {
      return {
        ...state,
        cars: action.payload
      }
    }
    default:
      return state;
  }
}

export const getCars = () => async (dispatch) => {
  const data = await carAPI.getCars()
  dispatch(carActions.setCars(data))
}

export const getCategories = () => async (dispatch) => {
  const data = await carAPI.getCategories()
  console.log(data)
  //dispatch(carActions.setCars(data))
}

export default carReducer;