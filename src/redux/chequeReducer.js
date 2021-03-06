import {chequeActions} from "./actions/chequeActions";
import {orderAPI} from "../api/api";

const initialState = {
  chequeData: {
    city: null,
    address: null,
    car: null,
    color: null,
    date: null,
    tariff: null,
    isFullTank: false,
    isNeedChildChair: false,
    isRightWheel: false,
  },
  chequePrices: {
    carPrice: 0,
    tankPrice: 0,
    childChairPrice: 0,
    rightWheelPrice: 0,
  },
  order: null,
  orderForRequest: null
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
        chequePrices: {
          ...state.chequePrices,
          carPrice: action.payload.priceMin
        }
      }
    }
    case "CHEQUE/UPDATE_TARIFF": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          tariff: action.payload
        }
      }
    }
    case "CHEQUE/UPDATE_COLOR": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          color: action.payload
        }
      }
    }
    case "CHEQUE/UPDATE_DATE": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          date: action.payload
        }
      }
    }
    case "CHEQUE/TOGGLE_TANK": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          isFullTank: !state.chequeData.isFullTank
        },
        chequePrices: {
          ...state.chequePrices,
          tankPrice: action.payload
        }
      }
    }
    case "CHEQUE/TOGGLE_CHILD_CHAIR": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          isNeedChildChair: !state.chequeData.isNeedChildChair
        },
        chequePrices: {
          ...state.chequePrices,
          childChairPrice: action.payload
        }
      }
    }
    case "CHEQUE/TOGGLE_RIGHT_WHEEL": {
      return {
        ...state,
        chequeData: {
          ...state.chequeData,
          isRightWheel: !state.chequeData.isRightWheel
        },
        chequePrices: {
          ...state.chequePrices,
          rightWheelPrice: action.payload
        }
      }
    }
    case "CHEQUE/SET_ORDER": {
      return {
        ...state,
        order: action.payload
      }
    }
    case "CHEQUE/SET_ORDER_FOR_REQUEST": {
      return {
        ...state,
        orderForRequest: action.payload
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
export const updateChequeTariff = (tariff) => async (dispatch) => {
  dispatch(chequeActions.updateChequeTariff(tariff))
}
export const updateChequeColor = (color) => async (dispatch) => {
  dispatch(chequeActions.updateChequeColor(color))
}
export const updateChequeDate = (date) => async (dispatch) => {
  dispatch(chequeActions.updateChequeDate(date))
}
export const updateChequeIsFullTank = (price) => async (dispatch) => {
  dispatch(chequeActions.updateChequeIsFullTank(price))
}
export const updateChequeIsNeedChildChair = (price) => async (dispatch) => {
  dispatch(chequeActions.updateChequeIsNeedChildChair(price))
}
export const updateChequeIsRightWheel = (price) => async (dispatch) => {
  dispatch(chequeActions.updateChequeIsRightWheel(price))
}

export const getOrderByID = (id) => async (dispatch) => {
  const data = await orderAPI.getOrderByID(id)
  dispatch(chequeActions.setOrder(data))
}
export const postOrder = (data) => async (dispatch) => {
  dispatch(chequeActions.setOrderForRequest(data))

  const response = await orderAPI.postOrder(data)

  if (response.status === 200) {
    dispatch(getOrderByID(response.data.data.id))
  } else {
    alert("Some Error Occurred. Your order hasn't be processed")
  }
}
export const putOrder = (data) => async (dispatch) => {
  const response = await orderAPI.putOrder(data)

  if (response.status === 200) {
    dispatch(getOrderByID(response.data.data.id))
  } else {
    alert("Some Error Occurred. Your order hasn't be cancelled")
  }
}

export default chequeReducer;