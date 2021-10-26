import {infoAPI} from "../api/api";
import {infoActions} from "./actions/infoActions";

const initialState = {
  orderStatuses: []
};

const infoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INFO/SET_ORDER_STATUSES": {
      return {
        ...state,
        orderStatuses: action.payload
      }
    }
    default:
      return state;
  }
}

export const getOrderStatuses = () => async (dispatch) => {
  const data = await infoAPI.getOrderStatuses()
  dispatch(infoActions.setOrderStatuses(data))
}

export default infoReducer;