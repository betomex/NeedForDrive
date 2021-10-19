import {addonAPI, orderAPI} from "../api/api";
import {addonActions} from "./actions/addonActions";

const initialState = {
  tariffs: []
};

const addonReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADDON/SET_TARIFFS": {
      return {
        ...state,
        tariffs: action.payload
      }
    }
    default:
      return state;
  }
}

export const getTariff = () => async (dispatch) => {
  const data = await addonAPI.getTariff()
  dispatch(addonActions.setTariffs(data))
}

export default addonReducer;