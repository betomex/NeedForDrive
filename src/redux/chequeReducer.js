import {chequeActions} from "./actions/chequeActions";

const initialState = {
  chequeData: {
    city: null,
    address: null,
    car: null
  }
}

const chequeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHEQUE/UPDATE_CHEQUEPOINT": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          city: action.payload.city,
          address: action.payload.address
        },
      }
    }
    case "CHEQUE/UPDATE_CAR": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          car: action.payload,
        },
      }
    }
    default:
      return state;
  }
}

export const updateChequePoint = (city, address) => async (dispatch) => {
  dispatch(chequeActions.updateChequePoint(city, address))
}

export const updateChequeCar = (car) => async (dispatch) => {
  dispatch(chequeActions.updateChequeCar(car))
}

export default chequeReducer;