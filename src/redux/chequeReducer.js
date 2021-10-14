import {chequeActions} from "./actions/chequeActions";

let initialState = {
  chequeData: {
    city: {
      name: "Город",
      value: ""
    },
    address: {
      name: "Адрес",
      value: ""
    },
    car: {
      name: "Модель",
      value: ""
    }
  }
}

const chequeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHEQUE/UPDATE_CHEQUEPOINT": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          city: {...state.chequeData.city, value: action.payload.city},
          address: {...state.chequeData.address, value: action.payload.address}
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

export default chequeReducer;